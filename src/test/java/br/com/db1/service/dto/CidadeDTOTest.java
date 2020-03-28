package br.com.db1.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.db1.web.rest.TestUtil;

public class CidadeDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CidadeDTO.class);
        CidadeDTO cidadeDTO1 = new CidadeDTO();
        cidadeDTO1.setId(1L);
        CidadeDTO cidadeDTO2 = new CidadeDTO();
        assertThat(cidadeDTO1).isNotEqualTo(cidadeDTO2);
        cidadeDTO2.setId(cidadeDTO1.getId());
        assertThat(cidadeDTO1).isEqualTo(cidadeDTO2);
        cidadeDTO2.setId(2L);
        assertThat(cidadeDTO1).isNotEqualTo(cidadeDTO2);
        cidadeDTO1.setId(null);
        assertThat(cidadeDTO1).isNotEqualTo(cidadeDTO2);
    }
}
