<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Exia</title>

    <!-- Favicons -->
    <link rel="icon" type="image/png" href="assets/ico/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="assets/ico/favicon-16x16.png" sizes="16x16" />

    <!-- Misc -->
    <meta name="theme-color" content="#36a3f7">

    <!-- Removes iOS format detection -->
    <meta name="format-detection" content="telephone=no" />
    <meta name="format-detection" content="date=no" />
    <meta name="format-detection" content="address=no" />
    <meta name="format-detection" content="email=no" />

    <!-- Fonts -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">

    <!-- Stylesheets -->
    <link rel="stylesheet" href="./assets/css/app.min.css">
</head>

<?php echo "<body>"; ?>

<?php
    $menu_items = array(
        "Item do menu",
        "Item do menu",
        "Item do menu",
        "Item do menu",
    );
?>

<header class="main-header-bundle js-get-main-header-height">
    <div class="main-header">
        <div class="container">
            <h1 class="main-header__logo-container">
                <span class="hide-text">Exia</span>
                <a href="/">
                </a>
            </h1>

            <div class="main-header__content">
                <div class="header-info">
                    <a href="#" class="button outline primary small">Botão</a>

                    <div class="social-listing-header">
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

                <div class="main-menu">
                    <ul class="main-menu__list list-style-remove">
                        <?php foreach($menu_items as $menu_item) : ?>
                            <li class="main-menu__item menu-item">
                                <a href="#" class="main-menu__link"><?php echo $menu_item; ?></a>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            </div>
            <!-- /.main-header__menu -->

            <div class="main-header__mobile-controls">
                <a href="#" class="button outline primary small">Botão</a>

                <div class="margin-horizontal--smaller"></div>

                <div class="burger-icon-container js-main-menu-mobile-toggle">
                    <div class="burger-icon primary"></div>
                </div>
            </div>
        </div>
    </div>
</header>

<div class="main-header-clearance"></div>

<?php include 'template-parts/main-menu-mobile.php'; ?>
