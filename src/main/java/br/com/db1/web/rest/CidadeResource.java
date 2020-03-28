package br.com.db1.web.rest;

import br.com.db1.service.CidadeService;
import br.com.db1.web.rest.errors.BadRequestAlertException;
import br.com.db1.service.dto.CidadeDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link br.com.db1.domain.Cidade}.
 */
@RestController
@RequestMapping("/api")
public class CidadeResource {

    private final Logger log = LoggerFactory.getLogger(CidadeResource.class);

    private static final String ENTITY_NAME = "cidade";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CidadeService cidadeService;

    public CidadeResource(CidadeService cidadeService) {
        this.cidadeService = cidadeService;
    }

    /**
     * {@code POST  /cidades} : Create a new cidade.
     *
     * @param cidadeDTO the cidadeDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cidadeDTO, or with status {@code 400 (Bad Request)} if the cidade has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cidades")
    public ResponseEntity<CidadeDTO> createCidade(@Valid @RequestBody CidadeDTO cidadeDTO) throws URISyntaxException {
        log.debug("REST request to save Cidade : {}", cidadeDTO);
        if (cidadeDTO.getId() != null) {
            throw new BadRequestAlertException("A new cidade cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CidadeDTO result = cidadeService.save(cidadeDTO);
        return ResponseEntity.created(new URI("/api/cidades/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cidades} : Updates an existing cidade.
     *
     * @param cidadeDTO the cidadeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cidadeDTO,
     * or with status {@code 400 (Bad Request)} if the cidadeDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cidadeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cidades")
    public ResponseEntity<CidadeDTO> updateCidade(@Valid @RequestBody CidadeDTO cidadeDTO) throws URISyntaxException {
        log.debug("REST request to update Cidade : {}", cidadeDTO);
        if (cidadeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CidadeDTO result = cidadeService.save(cidadeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cidadeDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cidades} : get all the cidades.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cidades in body.
     */
    @GetMapping("/cidades")
    public ResponseEntity<List<CidadeDTO>> getAllCidades(Pageable pageable) {
        log.debug("REST request to get a page of Cidades");
        Page<CidadeDTO> page = cidadeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /cidades/:id} : get the "id" cidade.
     *
     * @param id the id of the cidadeDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cidadeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cidades/{id}")
    public ResponseEntity<CidadeDTO> getCidade(@PathVariable Long id) {
        log.debug("REST request to get Cidade : {}", id);
        Optional<CidadeDTO> cidadeDTO = cidadeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cidadeDTO);
    }

    /**
     * {@code DELETE  /cidades/:id} : delete the "id" cidade.
     *
     * @param id the id of the cidadeDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cidades/{id}")
    public ResponseEntity<Void> deleteCidade(@PathVariable Long id) {
        log.debug("REST request to delete Cidade : {}", id);
        cidadeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/public/cidades")
    public ResponseEntity<List<CidadeDTO>> getPublicAllCidades() {
        log.debug("REST request to get a page of Cidades");
        return ResponseEntity.ok().body(cidadeService.findAllWhitoutPageable());
    }
}
