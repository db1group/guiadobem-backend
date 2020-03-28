package br.com.db1.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Cidade.
 */
@Entity
@Table(name = "cidade")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cidade implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "url_imagem")
    private String urlImagem;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Cidade nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getUrlImagem() {
        return urlImagem;
    }

    public Cidade urlImagem(String urlImagem) {
        this.urlImagem = urlImagem;
        return this;
    }

    public void setUrlImagem(String urlImagem) {
        this.urlImagem = urlImagem;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cidade)) {
            return false;
        }
        return id != null && id.equals(((Cidade) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Cidade{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", urlImagem='" + getUrlImagem() + "'" +
            "}";
    }
}
