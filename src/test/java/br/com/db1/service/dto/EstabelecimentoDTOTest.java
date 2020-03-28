package br.com.db1.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.db1.web.rest.TestUtil;

public class EstabelecimentoDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstabelecimentoDTO.class);
        EstabelecimentoDTO estabelecimentoDTO1 = new EstabelecimentoDTO();
        estabelecimentoDTO1.setId(1L);
        EstabelecimentoDTO estabelecimentoDTO2 = new EstabelecimentoDTO();
        assertThat(estabelecimentoDTO1).isNotEqualTo(estabelecimentoDTO2);
        estabelecimentoDTO2.setId(estabelecimentoDTO1.getId());
        assertThat(estabelecimentoDTO1).isEqualTo(estabelecimentoDTO2);
        estabelecimentoDTO2.setId(2L);
        assertThat(estabelecimentoDTO1).isNotEqualTo(estabelecimentoDTO2);
        estabelecimentoDTO1.setId(null);
        assertThat(estabelecimentoDTO1).isNotEqualTo(estabelecimentoDTO2);
    }
}
