interface CategoryFilters {
    [key: string]: string[];
  }
  
  const filtersConfig: CategoryFilters = {
    furniture: ['sofa', 'table', 'armchair', 'workstation', 'chair'],
    miscellaneous: ['bicycle', 'go-kart', 'parfum', 'luggage', 'handbag', 'sunglasses', 'tumbler'],
    shoes: ['soccer cleats', 'high heels', 'sandals', 'sneakers', 'high heel boots', 'pumps', 'loafers', 'casual shoes']
  };
  
  export default filtersConfig;
  