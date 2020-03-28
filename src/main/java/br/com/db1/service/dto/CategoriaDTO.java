package br.com.db1.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link br.com.db1.domain.Categoria} entity.
 */
public class CategoriaDTO implements Serializable {
    
    private Long id;

    @NotNull
    private String nome;

    private String urlImagem;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getUrlImagem() {
        return urlImagem;
    }

    public void setUrlImagem(String urlImagem) {
        this.urlImagem = urlImagem;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CategoriaDTO categoriaDTO = (CategoriaDTO) o;
        if (categoriaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), categoriaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CategoriaDTO{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", urlImagem='" + getUrlImagem() + "'" +
            "}";
    }
}
