package br.com.db1.web.rest;

import br.com.db1.AppbemApp;
import br.com.db1.domain.Estabelecimento;
import br.com.db1.repository.EstabelecimentoRepository;
import br.com.db1.service.EstabelecimentoService;
import br.com.db1.service.dto.EstabelecimentoDTO;
import br.com.db1.service.mapper.EstabelecimentoMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link EstabelecimentoResource} REST controller.
 */
@SpringBootTest(classes = AppbemApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class EstabelecimentoResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONE = "BBBBBBBBBB";

    private static final String DEFAULT_WHATSAPP = "AAAAAAAAAA";
    private static final String UPDATED_WHATSAPP = "BBBBBBBBBB";

    private static final String DEFAULT_RESPONSAVEL = "AAAAAAAAAA";
    private static final String UPDATED_RESPONSAVEL = "BBBBBBBBBB";

    private static final String DEFAULT_URL_LOGO = "AAAAAAAAAA";
    private static final String UPDATED_URL_LOGO = "BBBBBBBBBB";

    private static final Boolean DEFAULT_PUBLICAR = false;
    private static final Boolean UPDATED_PUBLICAR = true;

    @Autowired
    private EstabelecimentoRepository estabelecimentoRepository;

    @Autowired
    private EstabelecimentoMapper estabelecimentoMapper;

    @Autowired
    private EstabelecimentoService estabelecimentoService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEstabelecimentoMockMvc;

    private Estabelecimento estabelecimento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Estabelecimento createEntity(EntityManager em) {
        Estabelecimento estabelecimento = new Estabelecimento()
            .nome(DEFAULT_NOME)
            .tipo(DEFAULT_TIPO)
            .telefone(DEFAULT_TELEFONE)
            .whatsapp(DEFAULT_WHATSAPP)
            .responsavel(DEFAULT_RESPONSAVEL)
            .urlLogo(DEFAULT_URL_LOGO)
            .publicar(DEFAULT_PUBLICAR);
        return estabelecimento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Estabelecimento createUpdatedEntity(EntityManager em) {
        Estabelecimento estabelecimento = new Estabelecimento()
            .nome(UPDATED_NOME)
            .tipo(UPDATED_TIPO)
            .telefone(UPDATED_TELEFONE)
            .whatsapp(UPDATED_WHATSAPP)
            .responsavel(UPDATED_RESPONSAVEL)
            .urlLogo(UPDATED_URL_LOGO)
            .publicar(UPDATED_PUBLICAR);
        return estabelecimento;
    }

    @BeforeEach
    public void initTest() {
        estabelecimento = createEntity(em);
    }

    @Test
    @Transactional
    public void createEstabelecimento() throws Exception {
        int databaseSizeBeforeCreate = estabelecimentoRepository.findAll().size();

        // Create the Estabelecimento
        EstabelecimentoDTO estabelecimentoDTO = estabelecimentoMapper.toDto(estabelecimento);
        restEstabelecimentoMockMvc.perform(post("/api/estabelecimentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estabelecimentoDTO)))
            .andExpect(status().isCreated());

        // Validate the Estabelecimento in the database
        List<Estabelecimento> estabelecimentoList = estabelecimentoRepository.findAll();
        assertThat(estabelecimentoList).hasSize(databaseSizeBeforeCreate + 1);
        Estabelecimento testEstabelecimento = estabelecimentoList.get(estabelecimentoList.size() - 1);
        assertThat(testEstabelecimento.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testEstabelecimento.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testEstabelecimento.getTelefone()).isEqualTo(DEFAULT_TELEFONE);
        assertThat(testEstabelecimento.getWhatsapp()).isEqualTo(DEFAULT_WHATSAPP);
        assertThat(testEstabelecimento.getResponsavel()).isEqualTo(DEFAULT_RESPONSAVEL);
        assertThat(testEstabelecimento.getUrlLogo()).isEqualTo(DEFAULT_URL_LOGO);
        assertThat(testEstabelecimento.isPublicar()).isEqualTo(DEFAULT_PUBLICAR);
    }

    @Test
    @Transactional
    public void createEstabelecimentoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = estabelecimentoRepository.findAll().size();

        // Create the Estabelecimento with an existing ID
        estabelecimento.setId(1L);
        EstabelecimentoDTO estabelecimentoDTO = estabelecimentoMapper.toDto(estabelecimento);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstabelecimentoMockMvc.perform(post("/api/estabelecimentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estabelecimentoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Estabelecimento in the database
        List<Estabelecimento> estabelecimentoList = estabelecimentoRepository.findAll();
        assertThat(estabelecimentoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = estabelecimentoRepository.findAll().size();
        // set the field null
        estabelecimento.setNome(null);

        // Create the Estabelecimento, which fails.
        EstabelecimentoDTO estabelecimentoDTO = estabelecimentoMapper.toDto(estabelecimento);

        restEstabelecimentoMockMvc.perform(post("/api/estabelecimentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estabelecimentoDTO)))
            .andExpect(status().isBadRequest());

        List<Estabelecimento> estabelecimentoList = estabelecimentoRepository.findAll();
        assertThat(estabelecimentoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTipoIsRequired() throws Exception {
        int databaseSizeBeforeTest = estabelecimentoRepository.findAll().size();
        // set the field null
        estabelecimento.setTipo(null);

        // Create the Estabelecimento, which fails.
        EstabelecimentoDTO estabelecimentoDTO = estabelecimentoMapper.toDto(estabelecimento);

        restEstabelecimentoMockMvc.perform(post("/api/estabelecimentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estabelecimentoDTO)))
            .andExpect(status().isBadRequest());

        List<Estabelecimento> estabelecimentoList = estabelecimentoRepository.findAll();
        assertThat(estabelecimentoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEstabelecimentos() throws Exception {
        // Initialize the database
        estabelecimentoRepository.saveAndFlush(estabelecimento);

        // Get all the estabelecimentoList
        restEstabelecimentoMockMvc.perform(get("/api/estabelecimentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estabelecimento.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO)))
            .andExpect(jsonPath("$.[*].telefone").value(hasItem(DEFAULT_TELEFONE)))
            .andExpect(jsonPath("$.[*].whatsapp").value(hasItem(DEFAULT_WHATSAPP)))
            .andExpect(jsonPath("$.[*].responsavel").value(hasItem(DEFAULT_RESPONSAVEL)))
            .andExpect(jsonPath("$.[*].urlLogo").value(hasItem(DEFAULT_URL_LOGO)))
            .andExpect(jsonPath("$.[*].publicar").value(hasItem(DEFAULT_PUBLICAR.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getEstabelecimento() throws Exception {
        // Initialize the database
        estabelecimentoRepository.saveAndFlush(estabelecimento);

        // Get the estabelecimento
        restEstabelecimentoMockMvc.perform(get("/api/estabelecimentos/{id}", estabelecimento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(estabelecimento.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO))
            .andExpect(jsonPath("$.telefone").value(DEFAULT_TELEFONE))
            .andExpect(jsonPath("$.whatsapp").value(DEFAULT_WHATSAPP))
            .andExpect(jsonPath("$.responsavel").value(DEFAULT_RESPONSAVEL))
            .andExpect(jsonPath("$.urlLogo").value(DEFAULT_URL_LOGO))
            .andExpect(jsonPath("$.publicar").value(DEFAULT_PUBLICAR.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingEstabelecimento() throws Exception {
        // Get the estabelecimento
        restEstabelecimentoMockMvc.perform(get("/api/estabelecimentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEstabelecimento() throws Exception {
        // Initialize the database
        estabelecimentoRepository.saveAndFlush(estabelecimento);

        int databaseSizeBeforeUpdate = estabelecimentoRepository.findAll().size();

        // Update the estabelecimento
        Estabelecimento updatedEstabelecimento = estabelecimentoRepository.findById(estabelecimento.getId()).get();
        // Disconnect from session so that the updates on updatedEstabelecimento are not directly saved in db
        em.detach(updatedEstabelecimento);
        updatedEstabelecimento
            .nome(UPDATED_NOME)
            .tipo(UPDATED_TIPO)
            .telefone(UPDATED_TELEFONE)
            .whatsapp(UPDATED_WHATSAPP)
            .responsavel(UPDATED_RESPONSAVEL)
            .urlLogo(UPDATED_URL_LOGO)
            .publicar(UPDATED_PUBLICAR);
        EstabelecimentoDTO estabelecimentoDTO = estabelecimentoMapper.toDto(updatedEstabelecimento);

        restEstabelecimentoMockMvc.perform(put("/api/estabelecimentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estabelecimentoDTO)))
            .andExpect(status().isOk());

        // Validate the Estabelecimento in the database
        List<Estabelecimento> estabelecimentoList = estabelecimentoRepository.findAll();
        assertThat(estabelecimentoList).hasSize(databaseSizeBeforeUpdate);
        Estabelecimento testEstabelecimento = estabelecimentoList.get(estabelecimentoList.size() - 1);
        assertThat(testEstabelecimento.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testEstabelecimento.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testEstabelecimento.getTelefone()).isEqualTo(UPDATED_TELEFONE);
        assertThat(testEstabelecimento.getWhatsapp()).isEqualTo(UPDATED_WHATSAPP);
        assertThat(testEstabelecimento.getResponsavel()).isEqualTo(UPDATED_RESPONSAVEL);
        assertThat(testEstabelecimento.getUrlLogo()).isEqualTo(UPDATED_URL_LOGO);
        assertThat(testEstabelecimento.isPublicar()).isEqualTo(UPDATED_PUBLICAR);
    }

    @Test
    @Transactional
    public void updateNonExistingEstabelecimento() throws Exception {
        int databaseSizeBeforeUpdate = estabelecimentoRepository.findAll().size();

        // Create the Estabelecimento
        EstabelecimentoDTO estabelecimentoDTO = estabelecimentoMapper.toDto(estabelecimento);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstabelecimentoMockMvc.perform(put("/api/estabelecimentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estabelecimentoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Estabelecimento in the database
        List<Estabelecimento> estabelecimentoList = estabelecimentoRepository.findAll();
        assertThat(estabelecimentoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEstabelecimento() throws Exception {
        // Initialize the database
        estabelecimentoRepository.saveAndFlush(estabelecimento);

        int databaseSizeBeforeDelete = estabelecimentoRepository.findAll().size();

        // Delete the estabelecimento
        restEstabelecimentoMockMvc.perform(delete("/api/estabelecimentos/{id}", estabelecimento.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Estabelecimento> estabelecimentoList = estabelecimentoRepository.findAll();
        assertThat(estabelecimentoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
