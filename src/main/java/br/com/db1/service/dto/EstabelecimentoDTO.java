package br.com.db1.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link br.com.db1.domain.Estabelecimento} entity.
 */
public class EstabelecimentoDTO implements Serializable {

    private Long id;

    @NotNull
    private String nome;

    @NotNull
    private String tipo;

    private String telefone;

    private String whatsapp;

    private String responsavel;

    private String urlLogo;

    private Boolean publicar;

    private Long cidadeId;

    private Long categoriaId;

    private String base64Image;

    private String nomeArquivo;

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

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getWhatsapp() {
        return whatsapp;
    }

    public void setWhatsapp(String whatsapp) {
        this.whatsapp = whatsapp;
    }

    public String getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(String responsavel) {
        this.responsavel = responsavel;
    }

    public String getUrlLogo() {
        return urlLogo;
    }

    public void setUrlLogo(String urlLogo) {
        this.urlLogo = urlLogo;
    }

    public Boolean isPublicar() {
        return publicar;
    }

    public void setPublicar(Boolean publicar) {
        this.publicar = publicar;
    }

    public Long getCidadeId() {
        return cidadeId;
    }

    public void setCidadeId(Long cidadeId) {
        this.cidadeId = cidadeId;
    }

    public Long getCategoriaId() {
        return categoriaId;
    }

    public void setCategoriaId(Long categoriaId) {
        this.categoriaId = categoriaId;
    }

    public String getNomeArquivo() {
        return nomeArquivo;
    }

    public void setNomeArquivo(String nomeArquivo) {
        this.nomeArquivo = nomeArquivo;
    }

    public Boolean getPublicar() {
        return publicar;
    }

    public String getBase64Image() {
        return base64Image;
    }

    public void setBase64Image(String base64Image) {
        this.base64Image = base64Image;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EstabelecimentoDTO estabelecimentoDTO = (EstabelecimentoDTO) o;
        if (estabelecimentoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), estabelecimentoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EstabelecimentoDTO{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", tipo='" + getTipo() + "'" +
            ", telefone='" + getTelefone() + "'" +
            ", whatsapp='" + getWhatsapp() + "'" +
            ", responsavel='" + getResponsavel() + "'" +
            ", urlLogo='" + getUrlLogo() + "'" +
            ", publicar='" + isPublicar() + "'" +
            ", cidadeId=" + getCidadeId() +
            ", categoriaId=" + getCategoriaId() +
            "}";
    }
}
