<script>
if ( ! jQuery( '#themify-tiles-css' ).length ) {
	jQuery( 'head' ).append( '<link rel="stylesheet" id="themify-tiles-css" href="<?php echo THEMIFY_TILES_URI; ?>assets/style.css" />' );
}

<?php echo Themify_Tiles::get_instance()->themify_tiles_script_vars(); ?>

if ( typeof Themify_Tiles !== 'object' ) {
	jQuery.ajax( {
		url: '<?php echo THEMIFY_TILES_URI; ?>assets/script.js',
		dataType: "script",
		cache: true
	} );
}
</script>