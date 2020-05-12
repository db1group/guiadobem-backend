package br.com.db1.service;

import br.com.db1.domain.Estabelecimento;
import br.com.db1.repository.EstabelecimentoRepository;
import br.com.db1.service.dto.EstabelecimentoDTO;
import br.com.db1.service.mapper.EstabelecimentoMapper;
import br.com.db1.service.util.ImageUtil;
import br.com.db1.service.util.RandomUtil;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Estabelecimento}.
 */
@Service
@Transactional
public class EstabelecimentoService {

    private final Logger log = LoggerFactory.getLogger(EstabelecimentoService.class);

    private final EstabelecimentoRepository estabelecimentoRepository;

    private final EstabelecimentoMapper estabelecimentoMapper;

    private static final String ENTITY_NAME = "estabelecimento";

    private static final String S3_ESTABELECIMENTO_NAME = "ESTABELECIMENTO/ESTABELECIMENTO/";

    private ImageUtil imageUtil;

    public EstabelecimentoService(EstabelecimentoRepository estabelecimentoRepository, EstabelecimentoMapper estabelecimentoMapper, ImageUtil imageUtil) {
        this.estabelecimentoRepository = estabelecimentoRepository;
        this.estabelecimentoMapper = estabelecimentoMapper;
        this.imageUtil = imageUtil;
    }

    /**
     * Save a estabelecimento.
     *
     * @param estabelecimentoDTO the entity to save.
     * @return the persisted entity.
     */
    public EstabelecimentoDTO save(EstabelecimentoDTO estabelecimentoDTO) {
        log.debug("Request to save Estabelecimento : {}", estabelecimentoDTO);
        Estabelecimento estabelecimento = estabelecimentoMapper.toEntity(estabelecimentoDTO);
        estabelecimento = estabelecimentoRepository.save(estabelecimento);
        return estabelecimentoMapper.toDto(estabelecimento);
    }

    /**
     * Get all the estabelecimentos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<EstabelecimentoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Estabelecimentos");
        return estabelecimentoRepository.findAll(pageable)
            .map(estabelecimentoMapper::toDto);
    }

    @Transactional(readOnly = true)
    public Page<EstabelecimentoDTO> findAllByQuery(Pageable pageable, String query) {
        log.debug("Request to get all Estabelecimentos");
        return estabelecimentoRepository.findAllByNomeContainingIgnoreCase(pageable, query)
            .map(estabelecimentoMapper::toDto);
    }

    /**
     * Get one estabelecimento by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<EstabelecimentoDTO> findOne(Long id) {
        log.debug("Request to get Estabelecimento : {}", id);
        return estabelecimentoRepository.findById(id)
            .map(estabelecimentoMapper::toDto);
    }

    /**
     * Delete the estabelecimento by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Estabelecimento : {}", id);
        estabelecimentoRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<EstabelecimentoDTO> findAll(Long cidadeId, Long categoriaId) {
        log.debug("Request to get all Estabelecimentos");
        return estabelecimentoMapper.toDto(estabelecimentoRepository.findAllByCidadeIdAndCategoriaIdAndPublicarIsTrueOrderByNomeAsc(cidadeId, categoriaId));
    }

    public EstabelecimentoDTO savePublic(EstabelecimentoDTO estabelecimentoDTO) {
        log.debug("Request to save Estabelecimento : {}", estabelecimentoDTO);
        estabelecimentoDTO.setPublicar(Boolean.FALSE);
        if(null != estabelecimentoDTO.getNomeArquivo() && !StringUtils.isEmpty(estabelecimentoDTO.getNomeArquivo())
            && null != estabelecimentoDTO.getBase64Image() && !StringUtils.isEmpty(estabelecimentoDTO.getBase64Image())) {
            EstabelecimentoDTO savedEstabelecimentoDTO = save(estabelecimentoDTO);
            savedEstabelecimentoDTO.setUrlLogo(uploadFile(savedEstabelecimentoDTO.getId(), estabelecimentoDTO.getNomeArquivo(), estabelecimentoDTO.getBase64Image()));
            return  save(savedEstabelecimentoDTO);
        }
        return save(estabelecimentoDTO);
    }

    private String uploadFile(Long estabelecimentoId, String nomeArquivo, String base64Image){
        String arquivo = estabelecimentoId + "_" + RandomUtil.generateFileKey() + nomeArquivo;
        return imageUtil.uploadImageS3(base64Image, arquivo, estabelecimentoId, S3_ESTABELECIMENTO_NAME);
    }
}
