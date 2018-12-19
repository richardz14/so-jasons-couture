<?php
/**
 * Render the tiles editor for a post
 * @var $data array of tiles to render
 * @var $gutter
 * @var $fluid_tiles
 */
?>
<?php
$tiles_size = array( '16' => 6, '20' => 5, '25' => 4, '30' => 3 );
$tiles_per_row = ! empty( $tiles_size[$fluid_tiles_size] ) ? $tiles_size[$fluid_tiles_size] : 5;
?>

<?php echo $this->load_view( 'loader.php' ); ?>

<div id="tf-tiles-<?php echo $post_id; ?>" class="tf-tiles <?php if( $fluid_tiles == 'yes' ) echo 'fluid-tiles'; ?>" data-post_id="<?php echo $post_id; ?>">

	<div class="tf-tiles-wrap" data-base_size="<?php echo $fluid_tiles_size ?>" data-tiles_per_row="<?php echo $tiles_per_row ?>">
		<?php if( ! empty( $data ) ) : foreach( $data as $key => $tile ) : ?>
			<?php echo $this->load_view( 'tile-single.php', array(
				'mod_settings' => (array) $tile, // $tile should be an array
				'module_ID' => 'tf-tile-' . $post_id . '-' . $key
			) ); ?>
		<?php endforeach; endif; ?>
	</div>
</div>
<?php if( ! empty( $gutter ) ) : ?>
<style>
	#tf-tiles-<?php echo $post_id; ?> .tile-flip-box-wrap {
		padding: <?php echo $gutter; ?>px;
	}
	#tf-tiles-<?php echo $post_id; ?> .tf-tiles-wrap {
		width: calc( 100% + <?php echo $gutter * 2; ?>px );
		margin-left: -<?php echo $gutter; ?>px;
	}
</style>
<?php endif; ?>