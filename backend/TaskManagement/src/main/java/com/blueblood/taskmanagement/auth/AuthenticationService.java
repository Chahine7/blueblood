package com.blueblood.taskmanagement.auth;


import com.blueblood.taskmanagement.exceptions.DuplicateResourceException;
import com.blueblood.taskmanagement.jwt.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final UserDTOMapper userDTOMapper;
    private final JwtUtil jwtUtil;
    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationService(AuthenticationManager authenticationManager,
                                 UserDTOMapper userDTOMapper,
                                 JwtUtil jwtUtil, UserDao userDao, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userDTOMapper = userDTOMapper;
        this.jwtUtil = jwtUtil;
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthenticationResponse login(AuthenticationRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(),
                        request.password()
                )
        );
        User principal = (User) authentication.getPrincipal();
        UserDTO userDTO = userDTOMapper.apply(principal);
        String token = jwtUtil.issueToken(userDTO.username(), userDTO.roles());
        return new AuthenticationResponse(token, userDTO);
    }
    public void register(UserRegistrationRequest userRegistrationRequest) {
        if (userDao.existsByEmail(userRegistrationRequest.email())) {
            throw new DuplicateResourceException(
                    "email already taken"
            );
        }

        userDao.insertUser(
                new User(
                        userRegistrationRequest.name(),
                        userRegistrationRequest.email(),
                        passwordEncoder.encode(userRegistrationRequest.password()))
        );
    }

}