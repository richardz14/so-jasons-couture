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
define('WP_CACHE', true);
define( 'WPCACHEHOME', 'C:\xampp\htdocs\JC\wordpress\wp-content\plugins\wp-super-cache/' );
define('DB_NAME', 'JC');

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
define('AUTH_KEY',         'ZhfTng;O_YiaR#EG{MQ1:FnGE<9YAi+Z@P0ix0s#.#aeB7i5aQ(L|-UV9r?4}BW-');
define('SECURE_AUTH_KEY',  't%h*cloDg9kQB=p2]]A{!,Gq#O~G/?MC.8oX7-eNW>q~2h.XqHeF3}jQ,x<5lf&1');
define('LOGGED_IN_KEY',    'qos*uzL%(l.WL[]}6!_]2$2#]7%<u$jGeIZDrvx}-:Z*TQ`{>Imr2x[$<rlTfD<=');
define('NONCE_KEY',        '&PVp+M;D*(Cz1mm5HXw^D|1y#KL|!|USGlS#%<YjYy(RY_T<M}7:~0VDFS^0_-DY');
define('AUTH_SALT',        'K[mtvl?9J;+lbgm1ME__ny<OCKr2K*A~Z8@lJ[*_]0{B!$?3jOv lgc9q=^x.P_+');
define('SECURE_AUTH_SALT', 'A,|CynABuf`[&?Z5xnUodKk1S=[y]bebBw8n@oD~Ib`&Fye+8dy}~%TRYoli=_t)');
define('LOGGED_IN_SALT',   't][+/%<%rfwN1,t8aF^2)@DXj54~^ v/KsxQZh+SDzYA+vkK8/VM&J]5m-(y;|}O');
define('NONCE_SALT',       '4#!/ln_0V>{E?:Micsf}Qe;y9+Hu.ASZ=KowDtx*E2RiIh4+bGlwSC6046vi9XB}');

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
