<?php
/*
Template name: Наша команда
*/
?>

<?php
get_header();
?>

<div class="specialists">
   <div class="container">
         <div class="title"><?php the_field('team_title'); ?></div>
         <div class="row">
            <div class="col-lg-10 offset-lg-1">
               <?php $image11 = get_field('team_img');
                  if (!empty($image11)): ?>
                     <img class="specialists__img"
                        src="<?php echo $image11 ['url']; ?>"
                        alt="<?php echo $image11 ['alt']; ?>"
                     >
                  <?php endif; ?>
            </div>
         </div>
   </div>
</div>

<?php
get_footer();
?>
