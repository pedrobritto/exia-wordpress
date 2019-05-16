<div class="main-menu-mobile">
    <div class="mobile-menu__content">
        <ul class="main-menu-mobile__list list-style-remove">
            <?php foreach($menu_items as $menu_item) : ?>
                <li class="main-menu-mobile__item menu-item js-close-menu-mobile">
                    <a href="#" class="main-menu-mobile__link"><?php echo $menu_item; ?></a>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>

    <div class="mobile-menu__footer">
        <div class="social-listing-mobile-menu">
            <a href="#" class="social-listing__item">
                <i class="fab fa-fw fa-facebook-f"></i>
            </a>
            <a href="#" class="social-listing__item">
                <i class="fab fa-fw fa-instagram"></i>
            </a>
            <a href="#" class="social-listing__item">
                <i class="fab fa-fw fa-twitter"></i>
            </a>
        </div>
    </div>
</div>
