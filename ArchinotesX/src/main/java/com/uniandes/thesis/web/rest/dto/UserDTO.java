package com.uniandes.thesis.web.rest.dto;

import com.uniandes.thesis.domain.Authority;
import com.uniandes.thesis.domain.User;
import lombok.Getter;
import org.hibernate.validator.constraints.Email;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * A DTO representing a user, with his authorities.
 */
@Getter
public class UserDTO {

    @Pattern(regexp = "^[a-z0-9]*$")
    @NotNull
    @Size(min = 1, max = 50)
    private String login;

    @Size(max = 50)
    private String firstName;

    @Size(max = 50)
    private String lastName;

    @Email
    @Size(min = 5, max = 100)
    private String email;

    private boolean activated = false;

    @Size(min = 2, max = 5)
    private String langKey;

    @Size(min = 13, max = 13)
    private String mobileNumber;

    private Set<String> authorities;

    @Size(max = 50)
    private String projectName;

    @Size(max = 50)
    private String companyName;

    @Size(max = 50)
    private String companyLogo;

    public UserDTO() {
    }

    public UserDTO(User user) {
        this(user.getLogin(), user.getFirstName(), user.getLastName(),
            user.getEmail(), user.getActivated(), user.getLangKey(), user.getMobileNumber(),
            user.getAuthorities().stream().map(Authority::getName)
                .collect(Collectors.toSet()), user.getProject().getName(), user.getProject().getCompany().getName(), user.getProject().getCompany().getLogo());
    }

    public UserDTO(String login, String firstName, String lastName,
        String email, boolean activated, String langKey, String mobileNumber, Set<String> authorities, String projectName, String companyName, String companyLogo) {

        this.login = login;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.activated = activated;
        this.langKey = langKey;
        this.authorities = authorities;
        this.projectName = projectName;
        this.companyName = companyName;
        this.companyLogo = companyLogo;
        this.mobileNumber = mobileNumber;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
            "login='" + login + '\'' +
            ", firstName='" + firstName + '\'' +
            ", lastName='" + lastName + '\'' +
            ", email='" + email + '\'' +
            ", activated=" + activated +
            ", langKey='" + langKey + '\'' +
            ", mobileNumber='" + mobileNumber + '\'' +
            ", authorities=" + authorities +
            ", projectName=" + projectName +
            ", companyName=" + companyName +
            ", companyLogo=" + companyLogo +
            "}";
    }
}
