package br.com.db1.service.mapper;


import br.com.db1.domain.*;
import br.com.db1.service.dto.EstabelecimentoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Estabelecimento} and its DTO {@link EstabelecimentoDTO}.
 */
@Mapper(componentModel = "spring", uses = {CidadeMapper.class, CategoriaMapper.class})
public interface EstabelecimentoMapper extends EntityMapper<EstabelecimentoDTO, Estabelecimento> {

    @Mapping(source = "cidade.id", target = "cidadeId")
    @Mapping(source = "categoria.id", target = "categoriaId")
    @Mapping(source = "categoria.nome", target = "categoriaNome")
    @Mapping(source = "cidade.nome", target = "cidadeNome")
    EstabelecimentoDTO toDto(Estabelecimento estabelecimento);

    @Mapping(source = "cidadeId", target = "cidade")
    @Mapping(source = "categoriaId", target = "categoria")
    Estabelecimento toEntity(EstabelecimentoDTO estabelecimentoDTO);

    default Estabelecimento fromId(Long id) {
        if (id == null) {
            return null;
        }
        Estabelecimento estabelecimento = new Estabelecimento();
        estabelecimento.setId(id);
        return estabelecimento;
    }
}
