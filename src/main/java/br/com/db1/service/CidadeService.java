package br.com.db1.service;

import br.com.db1.domain.Cidade;
import br.com.db1.repository.CidadeRepository;
import br.com.db1.service.dto.CidadeDTO;
import br.com.db1.service.mapper.CidadeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Cidade}.
 */
@Service
@Transactional
public class CidadeService {

    private final Logger log = LoggerFactory.getLogger(CidadeService.class);

    private final CidadeRepository cidadeRepository;

    private final CidadeMapper cidadeMapper;

    public CidadeService(CidadeRepository cidadeRepository, CidadeMapper cidadeMapper) {
        this.cidadeRepository = cidadeRepository;
        this.cidadeMapper = cidadeMapper;
    }

    /**
     * Save a cidade.
     *
     * @param cidadeDTO the entity to save.
     * @return the persisted entity.
     */
    public CidadeDTO save(CidadeDTO cidadeDTO) {
        log.debug("Request to save Cidade : {}", cidadeDTO);
        Cidade cidade = cidadeMapper.toEntity(cidadeDTO);
        cidade = cidadeRepository.save(cidade);
        return cidadeMapper.toDto(cidade);
    }

    /**
     * Get all the cidades.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<CidadeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Cidades");
        return cidadeRepository.findAll(pageable)
            .map(cidadeMapper::toDto);
    }

    /**
     * Get one cidade by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<CidadeDTO> findOne(Long id) {
        log.debug("Request to get Cidade : {}", id);
        return cidadeRepository.findById(id)
            .map(cidadeMapper::toDto);
    }

    /**
     * Delete the cidade by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Cidade : {}", id);
        cidadeRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<CidadeDTO> findAllWhitoutPageable() {
        log.debug("Request to get all Cidades");
        return cidadeMapper.toDto(cidadeRepository.findAllByOrderByNome());
    }
}
