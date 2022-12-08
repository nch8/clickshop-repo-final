package com.proyecto.grupo1.ProyectoGrupo1.seguridad;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.UserGeneric;
import com.proyecto.grupo1.ProyectoGrupo1.jwtservice.JwtUserDetailsService;
import io.jsonwebtoken.ExpiredJwtException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    private final JwtUserDetailsService jwtUserDetailsService;
    private final JwtTokenUtil jwtTokenUtil;

    public JwtRequestFilter(JwtUserDetailsService jwtUserDetailsService, JwtTokenUtil jwtTokenUtil) {
        this.jwtUserDetailsService = jwtUserDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String requestTokenHeader = request.getHeader("Authorization");
        if (StringUtils.startsWith(requestTokenHeader,"Bearer ")) {
            String jwtToken = requestTokenHeader.substring(7);
            try {
                String correo = jwtTokenUtil.getUsernameFromToken(jwtToken); //se Seteo el correo como username
                if (StringUtils.isNotEmpty(correo)
                        && null == SecurityContextHolder.getContext().getAuthentication()) {
                    UserGeneric user = jwtUserDetailsService.loadUserByEmail(correo);
                    if (jwtTokenUtil.validateToken(jwtToken, user)) {
                        //Seteo el rol dentro de GrantedAuthority
                        List<GrantedAuthority> authorityList = new ArrayList<>();
                        authorityList.add(new SimpleGrantedAuthority(user.getRol().toString()));

                        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                                new UsernamePasswordAuthenticationToken(
                                        user, null, authorityList);
                        usernamePasswordAuthenticationToken
                                .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext()
                                .setAuthentication(usernamePasswordAuthenticationToken);
                    }
                }
            } catch (IllegalArgumentException e) {
                logger.error("No se puede obtener el token JWT");
            } catch (ExpiredJwtException e) {
                logger.error("JWT Token expirado");
            } catch (Exception e) {
                logger.error(e.getMessage());
            }
        } else {
            logger.warn("El token JWT no comienza con el String Bearer");
        }
        response.addHeader("Access-Control-Expose-Headers", "Authorization,RefreshAuthentication");
        chain.doFilter(request, response);
    }

}
