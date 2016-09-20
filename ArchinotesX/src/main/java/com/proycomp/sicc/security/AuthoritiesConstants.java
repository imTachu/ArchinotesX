package com.proycomp.sicc.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {

    public static final String ADMIN = "ROLE_ADMIN";

    /**
     * Roles Concesión
     */
    public static final String OPERADOR1 = "ROLE_OPERADOR1";
    public static final String OPERADOR2 = "ROLE_OPERADOR2";
    public static final String CONSULTA_CONCESION = "ROLE_CONSULTA_CONCESION";
    public static final String SUPERVISOR = "ROLE_SUPERVISOR";

    /**
     * Roles Interventoría
     */
    public static final String CONSULTA_INTERVENTOR = "ROLE_CONSULTA_INTERVENTOR";
    public static final String INTERVENTOR = "ROLE_INTERVENTOR";

    private AuthoritiesConstants() {
    }
}
