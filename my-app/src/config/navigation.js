/**
 * Centralized navigation configuration
 * Reduces redundancy and makes navigation items easily maintainable
 */
export const navigationItems = [
    { path: '/', label: 'Home', showSearch: true },
    { path: '/products', label: 'Products', showSearch: true },
    { path: '/support', label: 'Support', showSearch: false },
    { path: '/cart', label: 'Cart', showSearch: false },
    { path: '/account', label: 'Account', showSearch: false }
];

export const getNavigationItem = (path) => {
    return navigationItems.find(item => item.path === path);
};

export const shouldShowSearch = (pathname) => {
    const item = getNavigationItem(pathname);
    return item?.showSearch || false;
};