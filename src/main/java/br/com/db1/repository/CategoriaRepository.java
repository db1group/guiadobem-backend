package br.com.db1.repository;

import br.com.db1.domain.Categoria;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Categoria entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}
