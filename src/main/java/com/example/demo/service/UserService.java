package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String register(User user) {
        // Verificar si el usuario ya existe
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return "El usuario ya existe";
        }
        
        // Guardar el nuevo usuario
        userRepository.save(user);
        return "Usuario registrado exitosamente";
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);
        
        if (user != null && user.getPassword().equals(password)) {
            return user; // Devuelve el objeto usuario completo
        }
        
        return null; // Credenciales incorrectas
    }
}