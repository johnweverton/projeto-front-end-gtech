import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../Layout';
import Section from '../../components/Section';
import ProductListing from '../../components/ProductListing';
import FilterGroup from '../../components/FilterGroup';
import { filterGroups, products } from '../../data/products';
import { filterProducts } from '../../utils/filterProducts';
import './ProductListingPage.css';

const initialFilters = filterGroups.reduce(
  (acc, group) => ({ ...acc, [group.key]: group.inputType === 'radio' ? '' : [] }),
  {},
);

const ProductListingPage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('filter') ?? '';
  const [sort, setSort] = useState('lowest');
  const [filters, setFilters] = useState(initialFilters);

  const result = useMemo(() => filterProducts(products, { search, filters, sort }), [search, filters, sort]);

  const handleFilterChange = (group) => (value, checked) => {
    setFilters((current) => {
      if (group.inputType === 'radio') return { ...current, [group.key]: value };
      const values = current[group.key];
      return {
        ...current,
        [group.key]: checked ? [...values, value] : values.filter((item) => item !== value),
      };
    });
  };

  const hasActiveFilters = Object.values(filters).some((value) => (Array.isArray(value) ? value.length : value));
  const count = `${result.length} ${result.length === 1 ? 'produto' : 'produtos'}`;
  const title = search ? `Resultados para "${search}" - ${count}` : `${count} encontrados`;

  return (
    <Layout>
      <div className="container listing">
        <aside className="listing__sidebar">
          <div className="listing__sort">
            <label htmlFor="sort">Ordenar por</label>
            <select id="sort" value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="lowest">Menor preço</option>
              <option value="highest">Maior preço</option>
            </select>
          </div>

          <div className="listing__filters">
            <div className="listing__filters-header">
              <h2>Filtrar por</h2>
              {hasActiveFilters && (
                <button type="button" onClick={() => setFilters(initialFilters)}>
                  Limpar
                </button>
              )}
            </div>
            <hr />
            {filterGroups.map((group) => (
              <FilterGroup
                key={group.key}
                name={group.key}
                title={group.title}
                inputType={group.inputType}
                options={group.options}
                selected={filters[group.key]}
                onChange={handleFilterChange(group)}
              />
            ))}
          </div>
        </aside>

        <div className="listing__results">
          <Section title={title} titleAlign="left">
            <ProductListing products={result} columns={3} />
          </Section>
        </div>
      </div>
    </Layout>
  );
};

export default ProductListingPage;
