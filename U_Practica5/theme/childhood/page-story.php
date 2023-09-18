<?php
/*
Template name: История
*/
?>

<?php
get_header();
?>

<div class="aboutus">
  <div class="container">
        <h1 class="title"><?php the_field('story_title'); ?></h1>
        <div class="row">
            <div class="col-lg-6">
              <div class="subtitle">
                  <?php the_field('story_subtitle_fact_1'); ?>
              </div>
              <div class="aboutus__text">
                  <?php the_field('story_txt_fact_1'); ?>
              </div>
            </div>
            <div class="col-lg-6">
              <?php $image = get_field('story_img_fact_1'); if (!empty($image)): ?>
              <img class="aboutus__img" src="<?php echo $image ['url']; ?>" alt="<?php echo $image ['alt']; ?>">
              <?php endif;?>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6">
              <img class="aboutus__img" src="<?php the_field('story_img_fact_2'); ?>" alt="мир детства">
            </div>
            <div class="col-lg-6">
              <div class="subtitle">
                  <?php the_field('story_subtitle_fact_2'); ?>
              </div>
              <div class="aboutus__text">
                  <?php the_field('story_txt_fact_2'); ?>
              </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6">
              <div class="subtitle">
                  <?php the_field('story_subtitle_fact_3'); ?>
              </div>
              <div class="aboutus__text">
                  <?php the_field('story_txt_fact_3'); ?>
              </div>
            </div>
            <div class="col-lg-6">
              <?php $image = get_field('story_img_fact_3'); if (!empty($image)): ?>
            <img class="aboutus__img" src="<?php echo $image ['url']; ?>" alt="<?php echo $image ['alt']; ?>">
              <?php endif;?>
          </div>
      </div>
  </div>
</div>

<?php
get_footer();
?>
