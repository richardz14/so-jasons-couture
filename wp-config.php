<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'JC_new');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'JxtEk~Z|LA$t&J-e}*`%>wlGa:@.gcveZ20sJ8EZ#YW2;CA8!DI9Me<Z;{*bY(1E');
define('SECURE_AUTH_KEY',  'r0c^KWA9A!SUh4sE_DNX:M8kCKtmq(vNA2|PyR1!eGjlx^AU)M.=#zfet![Zg^@>');
define('LOGGED_IN_KEY',    'nTa-a;oQ,_Y]]>;MIJpn-%yQu)/*!yK8)?q5EGY|LRE1kHe?tS.HmlW-d@UZCIKx');
define('NONCE_KEY',        'o8rz#.IM|C0Dd7Bq5m1_tJekTKv*$p03%GP5yFsNfR$u:lhYB9S=4=w&wQ:>j CF');
define('AUTH_SALT',        'J/{#J+Qko%pc92lJA9qjOrDm6:A6z2?T7m!%idZLC5W{Ax$Kx#WMt3M+yX2mb4jP');
define('SECURE_AUTH_SALT', 'y,TM6u4.P)2S OIh|3A(CPS/BG-{[`dc-K=[}Aew+O&aTO5zb37!Gur_=k`QK@Lt');
define('LOGGED_IN_SALT',   '$m5#(94c^CX~?:S|_u*L]a`H&9k@ozDFAN`zdncXoDo[cn:}U#mSsa`v^7t.2yT0');
define('NONCE_SALT',       'Dt)~-F0q/2stg&SL&[ HHhiLn=*AP*Gs .8)5aXwiF%p_<pV};uH:z7v/xUR@L60');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
