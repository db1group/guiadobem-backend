package br.com.db1.repository;

import br.com.db1.domain.Estabelecimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Estabelecimento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstabelecimentoRepository extends JpaRepository<Estabelecimento, Long> {

    List<Estabelecimento> findAllByCidadeIdAndCategoriaIdOrderByNomeAsc(Long cidadeId, Long categoriaId);

}
