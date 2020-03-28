package br.com.db1.repository;

import br.com.db1.domain.Cidade;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Cidade entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CidadeRepository extends JpaRepository<Cidade, Long> {
}
