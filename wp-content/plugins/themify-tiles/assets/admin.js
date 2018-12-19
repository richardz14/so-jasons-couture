var ThemifyTilesAdmin;

jQuery(function($){

	var $body = $( 'body' );
	var current_tile = null;

	ThemifyTilesAdmin = {
		init : function(){
			ThemifyTilesAdmin.setupLightbox();
			ThemifyPageBuilder.openGallery();
			ThemifyPageBuilder.mediaUploader();
			$body.on( 'click', '.tf-tiles-add', ThemifyTilesAdmin.add_new_tile );
			$body.on( 'click', '.tf-tiles-save', ThemifyTilesAdmin.save_tiles );
			$body.on( 'click', '#tf-tiles-save-settings a', ThemifyTilesAdmin.preview_tile );
			$body.on( 'click', '#themify_tiles_lightbox_parent .close_lightbox', ThemifyTilesAdmin.closeLightboxCallback );
			$body.on( 'dblclick', '#themify_tiles_overlay', ThemifyTilesAdmin.closeLightboxCallback );
			$body.on( 'dblclick', '.tf-tiles-editing .tf-tile .themify_builder_module_front_overlay', ThemifyTilesAdmin.edit_tile );
			$body.on( 'click', '.tf-tiles-editing .tf-tile .themify_module_options', ThemifyTilesAdmin.edit_tile );
			$body.on( 'click', '.tf-tiles-editing .tf-tile .themify_module_delete', ThemifyTilesAdmin.remove_tile );
			$body.on( 'click', '.tf-tiles-editing .tf-tile .themify_module_duplicate', ThemifyTilesAdmin.duplicate_tile );

			$body.on( 'mouseenter', '.tf-tiles-editing .tf-tile', ThemifyTilesAdmin.add_edit_edit_overlay );
			$body.on( 'mouseleave', '.tf-tiles-editing .tf-tile', ThemifyTilesAdmin.remove_edit_overlay );

			// layout icon selected
			$body.on('click', '.tfl-icon', function(e){
				$(this).addClass('selected').siblings().removeClass('selected');
				e.preventDefault();
			});

			$('<div/>', {id: 'themify_builder_alert', class: 'themify-builder-alert'}).appendTo( 'body' ).hide();

			ThemifyTilesAdmin.enable_editor();
		},

		add_edit_edit_overlay : function(){
			var markup = '<div class="themify_builder_module_front_overlay" style="display: block;"></div>' + 
				'<div class="module_menu_front">' +
					'<ul class="themify_builder_dropdown_front" style="display: block;">' +
						'<li class="themify_module_menu">' +
							'<span class="ti-menu"></span>' +
							'<ul>' +
								'<li><a href="#" title="Edit" class="themify_module_options" data-module-name="box">Edit</a></li>' +
								'<li><a href="#" title="Duplicate" class="themify_module_duplicate">Duplicate</a></li>' +
								'<li><a href="#" title="Delete" class="themify_module_delete">Delete</a></li>' +
							'</ul>' +
						'</li>' +
					'</ul>' +
				'</div>';
			$( this ).prepend( markup );
		},

		remove_edit_overlay : function() {
			$( this ).find( '.themify_builder_module_front_overlay, .module_menu_front' ).remove();
			/* @todo: re-arrange the tiles */
		},

		add_new_tile : function(){
			// make sure current_tile is empty
			current_tile = null;

			ThemifyTilesAdmin.openLightbox( $('#themify-tiles-settings').html(), function(){} );
			return false;
		},

		remove_tile : function(e){
			e.preventDefault();
			$( this ).closest( '.tf-tile' ).remove();
		},

		duplicate_tile : function(e){
			// make sure current_tile is empty
			current_tile = null;

			var data = $.parseJSON( ThemifyTilesAdmin.get_tile_data( $( this ).closest( '.tf-tile' ) ) );
			ThemifyTilesAdmin._add_tile( data );
			return false;
		},

		getDocHeight: function(){
			var D = window.document;
			return Math.max(
				Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
				Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
				Math.max(D.body.clientHeight, D.documentElement.clientHeight)
			);
		},

		setupLightbox: function() {
			var isThemifyTheme = '',
			// var isThemifyTheme = 'true' == themifyBuilder.isThemifyTheme? 'is-themify-theme' : 'is-not-themify-theme',
				markup = '<div id="themify_tiles_lightbox_parent" class="themify_builder builder-lightbox themify_builder_admin clearfix ' + isThemifyTheme + '">' +
				'<h3 class="themify_builder_lightbox_title"></h3>' +
				'<a href="#" class="close_lightbox"><i class="ti ti-close"></i></a>' +
				'<div id="themify_tiles_lightbox_container"></div>' +
			'</div>' +

			'<div id="themify_tiles_overlay"></div>';

			$(markup).hide().appendTo('body');

		},

		setColorPicker: function (context) {
			var self = ThemifyTilesAdmin;

			$('.minicolors-swatch', context).each(function () {
				var $this = $(this),
					parent = $this.closest('.minicolors_wrapper');

				$this.one( 'click', function ( e ) {
					var input = parent.find('.minicolors-input');
					parent.prepend(input).find('.minicolors').remove();
					self.colorPickerInit( input );
					! e.isTrigger && input.minicolors( 'show' );
				})
				.prev('.minicolors-input').one('focusin', function () {
					$(this).next('.minicolors-swatch').trigger('click');
				});

				parent.find('.color_opacity').one('change', function () {
					$this.prev('.minicolors-input').attr('data-opacity', $(this).val());
					$this.trigger('click');
				});

				parent.find('.minicolors-input').val() && parent.find('.color_opacity').trigger( 'change' );
			});
		},

		colorPickerInit: function( el ) {
			var $colorOpacity = el.next( '.color_opacity' ),
				id = el.prop( 'id' );

			el.minicolors( {
				opacity: 1,
				changeDelay: 200,
				beforeShow: function () {
					var lightbox = $( '#themify_tiles_lightbox_parent' ),
						p = el.closest( '.minicolors' ),
						panel = p.find( '.minicolors-panel' );

					if ( ( lightbox.offset().left + lightbox.width() ) <= panel.offset().left + panel.width() ) {
						p.addClass( 'tb-minicolors-right' );
					} else {
						p.removeClass( 'tb-minicolors-right' );
					}
				},
				change: function ( hex, opacity ) {
					var value;

					if ( ! hex || ( opacity && '0.99' == opacity ) ) {
						opacity = 1;
					}

					if ( ! $colorOpacity.is( ':focus' ) ) {
						$colorOpacity.attr( 'data-opacity', opacity ).data( 'opacity', opacity ).val( opacity );
					}

					value = hex ? $( this ).minicolors( 'rgbaString' ) : '';
				}
			} );

			$colorOpacity.on( 'blur keyup', function ( e ) {
				var opacity = parseFloat( $.trim( $( this ).val() ) );

				if( opacity > 1 || isNaN( opacity ) || opacity === '' || opacity < 0 ) {
					opacity = ! el.val() ? '' : 1;

					if( e.type === 'blur' ) $( this ).val( opacity );
				}

				$( this ).attr( 'data-opacity', opacity );
				el.minicolors( 'opacity', opacity );
			}).trigger( 'blur' );
		},

		openLightbox: function( options, callback, title ) {
			var self = ThemifyTilesAdmin,
				$lightboxContainer = $('#themify_tiles_lightbox_container');
			title = title || '';

			$lightboxContainer.empty();
			$('#themify_tiles_overlay').show();

			var top = $(document).scrollTop() + 50;

			// self.freezePage();
			// $( document ).on( 'keyup', ThemifyPageBuilder.lightboxCloseKeyListener );

			$('.themify_builder_lightbox_title').text(title);
			$lightboxContainer.html( options );
			$('#themify_tiles_lightbox_parent').show();

			// Get content height
			var h = $('#themify_tiles_lightbox_container').height(),
				windowH = $(window).height();

			$('#themify_tiles_lightbox_container .themify_builder_options_tab_content').css({'maxHeight': windowH * (70/100)});

			$body.trigger( 'tf_tiles_edit_tile' );

			if( $.isFunction( callback ) ){
				callback.call( this );
			}

			self.options_init();
		},

		closeLightboxCallback: function(e) {
			e.preventDefault();
			ThemifyTilesAdmin.closeLightbox();
		},

		closeLightbox : function() {
			if (tinyMCE !== undefined) {
				for (var i = tinymce.editors.length - 1; i > -1; i--) {
					if (tinymce.editors[i].id !== 'content') {
						tinyMCE.execCommand("mceRemoveEditor", true, tinymce.editors[i].id);
					}
				}
			}
			$('#themify_tiles_overlay').hide();
			$("#themify_tiles_lightbox_parent").hide();
		},

		options_init: function(){
			ThemifyTilesAdmin.setColorPicker();

			// tabular options
			$('.tb_tabs').tabs();

			$( '#type_front a, #type_back a' ).click(function(){
				var thiz = $(this),
					id = thiz.attr( 'id' );

				thiz.closest( '.tb_tab' )
					.find( '> .tf-tile-options' ).hide()
					.filter( '.tf-tile-options-' + id ).show()
			});

			// patch to fix the display of grouped options
			$( '.tf-option-checkbox-enable input' ).click(function(){
				var val = $(this).val();
				$( this ).closest( '.tb_tab' ).find( '.tf-group-element' ).hide().filter( '.tf-group-element-' + val ).show();
			}).filter( ':first-child' ).click();

			$( '.themify-layout-icon' ).each(function(){
				var $selected = $( this ).find( 'a' ).filter( '.selected' );
				if( $selected.length < 1 ) {
					$selected = $( this ).find( 'a' ).filter( ':first' );
				}
				$selected.click();
			});

			// TinyMCE editor
			$( '.tb_lb_wp_editor' ).each(function(){
				var id = $( this ).attr( 'id' );
				ThemifyTilesAdmin.initQuickTags( id );
				if ( typeof tinyMCE !== 'undefined' ) {
					ThemifyTilesAdmin.initNewEditor( id );
				}
			});
		},

		initQuickTags: function(editor_id) {
			// add quicktags
			 if ( typeof window.parent.QTags === 'function' ) {
				window.parent.quicktags({id: editor_id});
				window.parent.QTags._buttonsInit();
			}
		},

		initNewEditor: function (editor_id) {
			var $settings = tinyMCEPreInit.mceInit['tb_lb_hidden_editor'];
			$settings['elements'] = editor_id;
			$settings['selector'] = '#' + editor_id;
			// v4 compatibility
			return this.initMCEv4(editor_id, $settings);
		},
		initMCEv4: function (editor_id, $settings) {
			// v4 compatibility
			if (parseInt(tinyMCE.majorVersion) > 3) {
				// Creates a new editor instance
				var ed = new tinyMCE.Editor(editor_id, $settings, tinyMCE.EditorManager);
				ed.render();
				return ed;
			}
		},

		showLoader: function(stats) {
			if(stats == 'show'){
				$('#themify_builder_alert').addClass('busy').show();
			}
			else if(stats == 'spinhide'){
				$("#themify_builder_alert").delay(800).fadeOut(800, function() {
					$(this).removeClass('busy');
				});
			}
			else{
				$("#themify_builder_alert").removeClass("busy").addClass('done').delay(800).fadeOut(800, function() {
					$(this).removeClass('done');
				});
			}
		},

		retrieve_data: function () {
			var options = {};

			$('#themify_tiles_lightbox_parent .tb_lb_option').each(function(iterate){
				var option_value,
					this_option_id = $(this).attr('id');

				if ( $(this).hasClass('tb_lb_wp_editor') ) {
					if ( typeof tinyMCE !== 'undefined' ) {
						var tiny = tinyMCE.editors[this_option_id];
						if ( tiny !== undefined ) {
							option_value = tinyMCE.editors[this_option_id].getContent();
						} else {
							option_value = $(this).val();
						}
					} else {
						option_value = $(this).val();
					}
				}
				else if ( $(this).hasClass('themify-checkbox') ) {
					var cselected = [];
					$(this).find('.tb-checkbox:checked').each(function(i){
						cselected.push($(this).val());
					});
					if ( cselected.length > 0 ) {
						option_value = cselected.join('|');
					} else {
						option_value = '|';
					}
				}
				else if ( $(this).hasClass('themify-layout-icon') ) {
					if( $(this).find('.selected').length > 0 ){
						option_value = $(this).find('.selected').attr('id');
					}
					else{
						option_value = $(this).children().first().attr('id');
					}
				}
				else if ( $(this).hasClass('themify-option-query-cat') ) {
					var parent = $(this).parent(),
							single_cat = parent.find('.query_category_single'),
							multiple_cat  = parent.find('.query_category_multiple');

					if( multiple_cat.val() != '' ) {
						option_value = multiple_cat.val() + '|multiple';
					} else {
						option_value = single_cat.val() + '|single';
					}
				}
				else if ( $(this).hasClass('tf-radio-input-container') ) {
					option_value = $(this).find('input[name="'+this_option_id+'"]:checked').val();
				}
				else if ( $(this).hasClass('module-widget-form-container') ) {
					option_value = $(this).find(':input').serializeObject();
				}
				else if ( $(this).is('select, input, textarea') ) {
					option_value = $(this).val();
				}

				if(option_value){
					options[this_option_id] = option_value;
				}
			});

			return options;
		},

		edit_tile : function( e ) {
			current_tile = $( this ).closest( '.tf-tile' );
			var settings = JSON.parse( current_tile.find('.tf-tile-data script').text() );

			ThemifyTilesAdmin.openLightbox( $('#themify-tiles-settings').html(), function(){
				$('#themify_tiles_lightbox_parent .tb_lb_option').each( function(){
					var $this_option = $(this),
						this_option_id = $this_option.attr( 'id' ),
						$check_found_element = (typeof settings[this_option_id] !== 'undefined'),
						$found_element = settings[this_option_id];

					if ( $found_element ){
						if ( $this_option.hasClass('select_menu_field') ){
							if ( !isNaN( $found_element ) ) {
								$this_option.find("option[data-termid='" + $found_element + "']").attr('selected','selected');
							} else {
								$this_option.find("option[value='" + $found_element + "']").attr('selected','selected');
							}
						} else if ( $this_option.is('select') ){
							$this_option.val( $found_element );
						} else if( $this_option.hasClass('themify-builder-uploader-input') ) {
							var img_field = $found_element,
									img_thumb = $('<img/>', {src: img_field, width: 50, height: 50});

							if( img_field != '' ){
								$this_option.val(img_field);
								$this_option.parent().find('.img-placeholder').empty().html(img_thumb);
							}
							else{
								$this_option.parent().find('.thumb_preview').hide();
							}

						} else if($this_option.hasClass('themify-option-query-cat')){
							var parent = $this_option.parent(),
									single_cat = parent.find('.query_category_single'),
									multiple_cat  = parent.find('.query_category_multiple'),
									elems = $found_element,
									value = elems.split('|'),
									cat_type = value[1],
									cat_val = value[0];

							multiple_cat.val( cat_val );
							parent.find("option[value='" + cat_val + "']").attr('selected','selected');

						} else if( $this_option.hasClass('themify_builder_row_js_wrapper') ) {
							var row_append = 0;
							if($found_element.length > 0){
								row_append = $found_element.length - 1;
							}

							// add new row
							for (var i = 0; i < row_append; i++) {
								$this_option.parent().find('.add_new a').first().trigger('click');
							}

							$this_option.find('.themify_builder_row').each(function(r){
								$(this).find('.tb_lb_option_child').each(function(i){
									var $this_option_child = $(this),
									this_option_id_real = $this_option_child.attr('id'),
									this_option_id_child = $this_option_child.hasClass('tb_lb_wp_editor') ? $this_option_child.attr('name') : $this_option_child.data('input-id'),
									$found_element_child = $found_element[r][''+ this_option_id_child +''];
									
									if( $this_option_child.hasClass('themify-builder-uploader-input') ) {
										var img_field = $found_element_child,
											img_thumb = $('<img/>', {src: img_field, width: 50, height: 50});

										if( img_field != '' && img_field != undefined ){
											$this_option_child.val(img_field);
											$this_option_child.parent().find('.img-placeholder').empty().html(img_thumb).parent().show();
										}
										else{
											$this_option_child.parent().find('.thumb_preview').hide();
										}

									}
									else if( $this_option_child.hasClass('tf-radio-choice') ){
										$this_option_child.find("input[value='" + $found_element_child + "']").attr('checked','checked');  
									}
									else if( $this_option_child.is('input, textarea, select') ){
										$this_option_child.val($found_element_child);
									}

									if ( $this_option_child.hasClass('tb_lb_wp_editor') && !$this_option_child.hasClass('clone') ) {
										self.initQuickTags(this_option_id_real);
										if ( typeof tinyMCE !== 'undefined' ) {
											self.initNewEditor( this_option_id_real );
										}
									}

								});
							});

						} else if ( $this_option.hasClass('tf-radio-input-container') ){
							$this_option.find("input[value='" + $found_element + "']").attr('checked', 'checked');  
							var selected_group = $this_option.find('input[name="'+this_option_id+'"]:checked').val();

							// has group element enable
							if($this_option.hasClass('tf-option-checkbox-enable')){
								$('.tf-group-element').hide();
								$('.tf-group-element-' + selected_group ).show();
							}

						} else if ( $this_option.is('input, textarea') ){
							$this_option.val( $found_element );
						} else if ( $this_option.hasClass('themify-checkbox') ){
							var cselected = $found_element;
							cselected = cselected.split('|');

							$this_option.find('.tb-checkbox').each(function(){
								if($.inArray($(this).val(), cselected) > -1){
									$(this).prop('checked', true);
								}
								else{
									$(this).prop('checked', false);
								}
							});

						} else if ( $this_option.hasClass('themify-layout-icon') ) {
								$this_option.find('#' + $found_element.trim()).addClass('selected');
						} else { 
							$this_option.html( $found_element );
						}
					}
					else{
						if ( $this_option.hasClass('themify-layout-icon') ){
							$this_option.children().first().addClass('selected');
						}
						else if ( $this_option.hasClass('themify-builder-uploader-input') ) {
							$this_option.parent().find('.thumb_preview').hide();
						}
						else if ( $this_option.hasClass('tf-radio-input-container') ) {
							$this_option.find('input[type="radio"]').first().prop('checked');
							var selected_group = $this_option.find('input[name="'+this_option_id+'"]:checked').val();
							
							// has group element enable
							if($this_option.hasClass('tf-option-checkbox-enable')){
								$('.tf-group-element').hide();
								$('.tf-group-element-' + selected_group ).show();
							}
						}
						else if( $this_option.hasClass('themify_builder_row_js_wrapper') ){
							$this_option.find('.themify_builder_row').each(function(r){
								$(this).find('.tb_lb_option_child').each(function(i){
									var $this_option_child = $(this),
									this_option_id_real = $this_option_child.attr('id');

									if ( $this_option_child.hasClass('tb_lb_wp_editor') ) {
										
										var this_option_id_child = $this_option_child.data('input-id');

										self.initQuickTags(this_option_id_real);
										if ( typeof tinyMCE !== 'undefined' ) {
											self.initNewEditor( this_option_id_real );
										}
									}

								});
							});
						}
						else if( $this_option.hasClass('themify-checkbox') /*&& is_settings_exist*/ ) {
							$this_option.find('.tb-checkbox').each(function(){
								$(this).prop('checked', false);
							});
						}
						else if( $this_option.is('input, textarea') /*&& is_settings_exist*/ ) {
							$this_option.val('');
						}
					}
				});
			} );
		},

		/**
		 * Handles the Save button in the tile edit lightbox
		 */
		preview_tile: function (e) {
			e.preventDefault();
			ThemifyTilesAdmin._add_tile( ThemifyTilesAdmin.retrieve_data() );
		},

		_add_tile : function( options ) {
			$.ajax({
				type : 'POST',
				url : ajaxurl,
				data : {
					action : 'tf_preview_tile',
					tf_tile : options,
					tf_post_id : ThemifyTilesAdminVars.post_id,
					tile_id : current_tile ? current_tile.data( 'tile_id' ) : ''
				},
				success : function( result ) {
					if( current_tile ) {
						current_tile.replaceWith( result );
					} else {
						$( '#themify-tiles' ).find( '.tf-tiles-edit-wrap' ).append( result );
					}
					ThemifyTilesAdmin.closeLightbox();
					$body.trigger( 'tf_tiles_update' );
					Themify_Tiles.init();
				}
			});
		},

		get_tile_data : function( $tile ) {
			return $tile.find( '.tf-tile-data script' ).text();
		},

		/**
		 * Saving tiles for a post
		 */
		save_tiles : function(e, success_callback){
			e.preventDefault();
			var $this = $( this ),
				container = $( this ).closest( '.tf-tiles' ),
				tiles = [];

			if( $this.hasClass( 'saving' ) ) return;
			$this.addClass( 'saving' );

			container.find( '.tf-tiles-edit-wrap .tf-tile' ).each(function(){
				tiles.push( ThemifyTilesAdmin.get_tile_data( $( this ) ) );
			});

			$.ajax({
				type : 'POST',
				url : ajaxurl,
				data : {
					action : 'tf_save_tiles',
					tf_post_id : container.data( 'post_id' ),
					tf_data : tiles
				},
				success : function( result ){
					$this.removeClass( 'saving' );
					if( typeof success_callback == 'function' ) {
						success_callback();
					}
					$( '#publish' ).click();
				}
			});
		},

		enable_editor : function() {
			$( ".tf-tiles-edit-wrap", '#themify-tiles' ).sortable({
				placeholder: 'themify_builder_ui_state_highlight',
				cursor: 'move',
				handle: '.themify_builder_module_front_overlay, .themify_builder_sub_row_top',
				connectWith: '.tf-tile-edit-wrap',
				revert: 100,
				// helper: function() {
					// return $('<div class="themify_builder_sortable_helper"/>');
				// }
			});

			$body.trigger( 'tf_tiles_edit' );
		}
	};

	ThemifyTilesAdmin.init();

});