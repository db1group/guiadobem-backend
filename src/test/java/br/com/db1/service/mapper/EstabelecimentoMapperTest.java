package br.com.db1.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class EstabelecimentoMapperTest {

    private EstabelecimentoMapper estabelecimentoMapper;

    @BeforeEach
    public void setUp() {
        estabelecimentoMapper = new EstabelecimentoMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(estabelecimentoMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(estabelecimentoMapper.fromId(null)).isNull();
    }
}
