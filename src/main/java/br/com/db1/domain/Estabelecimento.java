package br.com.db1.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Estabelecimento.
 */
@Entity
@Table(name = "estabelecimento")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Estabelecimento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @NotNull
    @Column(name = "tipo", nullable = false)
    private String tipo;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "whatsapp")
    private String whatsapp;

    @Column(name = "responsavel")
    private String responsavel;

    @Column(name = "url_logo")
    private String urlLogo;

    @Column(name = "publicar")
    private Boolean publicar;

    @ManyToOne
    @JsonIgnoreProperties("estabelecimentos")
    private Cidade cidade;

    @ManyToOne
    @JsonIgnoreProperties("estabelecimentos")
    private Categoria categoria;

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

    public Estabelecimento nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTipo() {
        return tipo;
    }

    public Estabelecimento tipo(String tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getTelefone() {
        return telefone;
    }

    public Estabelecimento telefone(String telefone) {
        this.telefone = telefone;
        return this;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getWhatsapp() {
        return whatsapp;
    }

    public Estabelecimento whatsapp(String whatsapp) {
        this.whatsapp = whatsapp;
        return this;
    }

    public void setWhatsapp(String whatsapp) {
        this.whatsapp = whatsapp;
    }

    public String getResponsavel() {
        return responsavel;
    }

    public Estabelecimento responsavel(String responsavel) {
        this.responsavel = responsavel;
        return this;
    }

    public void setResponsavel(String responsavel) {
        this.responsavel = responsavel;
    }

    public String getUrlLogo() {
        return urlLogo;
    }

    public Estabelecimento urlLogo(String urlLogo) {
        this.urlLogo = urlLogo;
        return this;
    }

    public void setUrlLogo(String urlLogo) {
        this.urlLogo = urlLogo;
    }

    public Boolean isPublicar() {
        return publicar;
    }

    public Estabelecimento publicar(Boolean publicar) {
        this.publicar = publicar;
        return this;
    }

    public void setPublicar(Boolean publicar) {
        this.publicar = publicar;
    }

    public Cidade getCidade() {
        return cidade;
    }

    public Estabelecimento cidade(Cidade cidade) {
        this.cidade = cidade;
        return this;
    }

    public void setCidade(Cidade cidade) {
        this.cidade = cidade;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public Estabelecimento categoria(Categoria categoria) {
        this.categoria = categoria;
        return this;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Estabelecimento)) {
            return false;
        }
        return id != null && id.equals(((Estabelecimento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Estabelecimento{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", tipo='" + getTipo() + "'" +
            ", telefone='" + getTelefone() + "'" +
            ", whatsapp='" + getWhatsapp() + "'" +
            ", responsavel='" + getResponsavel() + "'" +
            ", urlLogo='" + getUrlLogo() + "'" +
            ", publicar='" + isPublicar() + "'" +
            "}";
    }
}
