



/* globals
    buildCodes,
    global_settings,
    inventreeGet,
    purchaseOrderCodes,
    returnOrderCodes,
    returnOrderLineItemCodes,
    salesOrderCodes,
    stockCodes,
*/

/* exported
    getAvailableTableFilters,
*/


// Construct a dynamic API filter for the "project" field
function constructProjectCodeFilter() {
    return {
        title: 'Project Code',
        options: function() {
            let project_codes = {};

            inventreeGet('/api/project-code/', {}, {
                async: false,
                success: function(response) {
                    for (let code of response) {
                        project_codes[code.pk] = {
                            key: code.pk,
                            value: code.code
                        };
                    }
                }
            });

            return project_codes;
        }
    };
}


// Construct a filter for the "has project code" field
function constructHasProjectCodeFilter() {
    return {
        type: 'bool',
        title: 'Has project code',
    };
}


// Reset a dictionary of filters for the attachment table
function getAttachmentFilters() {
    return {};
}


// Return a dictionary of filters for the return order table
function getReturnOrderFilters() {
    var filters = {
        status: {
            title: 'État de la commande',
            options: returnOrderCodes
        },
        outstanding: {
            type: 'bool',
            title: 'En suspens',
        },
        overdue: {
            type: 'bool',
            title: 'En retard',
        },
        assigned_to_me: {
            type: 'bool',
            title: 'Assigné à moi',
        },
    };

    if (global_settings.PROJECT_CODES_ENABLED) {
        filters['has_project_code'] = constructHasProjectCodeFilter();
        filters['project_code'] = constructProjectCodeFilter();
    }

    return filters;
}


// Return a dictionary of filters for the return order line item table
function getReturnOrderLineItemFilters() {
    return {
        received: {
            type: 'bool',
            title: 'Reçu',
        },
        outcome: {
            title: 'Outcome',
            options: returnOrderLineItemCodes,
        }
    };
}


// Return a dictionary of filters for the variants table
function getVariantsTableFilters() {
    return {
        active: {
            type: 'bool',
            title: 'Actif',
        },
        template: {
            type: 'bool',
            title: 'Modèle',
        },
        virtual: {
            type: 'bool',
            title: 'Virtuelle',
        },
        trackable: {
            type: 'bool',
            title: 'Traçable',
        },
    };
}


// Return a dictionary of filters for the BOM table
function getBOMTableFilters() {
    return {
        sub_part_trackable: {
            type: 'bool',
            title: 'Pièce traçable',
        },
        sub_part_assembly: {
            type: 'bool',
            title: 'Assembled Part',
        },
        available_stock: {
            type: 'bool',
            title: 'Has Available Stock',
        },
        on_order: {
            type: 'bool',
            title: 'En Commande',
        },
        validated: {
            type: 'bool',
            title: 'Validée',
        },
        inherited: {
            type: 'bool',
            title: 'Gets inherited',
        },
        allow_variants: {
            type: 'bool',
            title: 'Allow Variant Stock',
        },
        optional: {
            type: 'bool',
            title: 'Optional',
        },
        consumable: {
            type: 'bool',
            title: 'Consumable',
        },
        has_pricing: {
            type: 'bool',
            title: 'Has Pricing',
        },
    };
}


// Return a dictionary of filters for the "related parts" table
function getRelatedTableFilters() {
    return {};
}


// Return a dictionary of filters for the "used in" table
function getUsedInTableFilters() {
    return {
        'inherited': {
            type: 'bool',
            title: 'Gets inherited',
        },
        'optional': {
            type: 'bool',
            title: 'Optional',
        },
        'part_active': {
            type: 'bool',
            title: 'Actif',
        },
        'part_trackable': {
            type: 'bool',
            title: 'Traçable',
        },
    };
}


// Return a dictionary of filters for the "stock location" table
function getStockLocationFilters() {
    return {
        cascade: {
            type: 'bool',
            title: 'Inclure les sous-emplacements',
            description: 'Inclure les emplacements',
        },
        structural: {
            type: 'bool',
            title: 'Structural',
        },
        external: {
            type: 'bool',
            title: 'External',
        },
    };
}


// Return a dictionary of filters for the "part category" table
function getPartCategoryFilters() {
    return {
        cascade: {
            type: 'bool',
            title: 'Inclure les sous-catégories',
            description: 'Inclure les sous-catégories',
        },
        structural: {
            type: 'bool',
            title: 'Structural',
        },
        starred: {
            type: 'bool',
            title: 'Subscribed',
        },
    };
}


// Return a dictionary of filters for the "customer stock" table
function getCustomerStockFilters() {
    return {
        serialized: {
            type: 'bool',
            title: 'A un numéro de série',
        },
        serial_gte: {
            title: 'Numéro de série PGE',
            description: 'Numéro de série supérieur ou égal à',
        },
        serial_lte: {
            title: 'Numéro de série PPE',
            description: 'Numéro de série inférieur ou égal à',
        },
        serial: {
            title: 'Numéro de série',
            description: 'Numéro de série',
        },
        batch: {
            title: 'Lot',
            description: 'Code de lot',
        },
    };
}


// Return a dictionary of filters for the "stock" table
function getStockTableFilters() {
    var filters = {
        active: {
            type: 'bool',
            title: 'Pièces actives',
            description: 'Afficher le stock pour les pièces actives',
        },
        assembly: {
            type: 'bool',
            title: 'Assemblage',
            description: 'La pièce est un assemblage',
        },
        allocated: {
            type: 'bool',
            title: 'Est alloué',
            description: 'L\'élément a été alloué',
        },
        available: {
            type: 'bool',
            title: 'Disponible',
            description: 'Le stock est disponible pour utilisation',
        },
        cascade: {
            type: 'bool',
            title: 'Inclure les sous-emplacements',
            description: 'Include stock in sublocations',
        },
        depleted: {
            type: 'bool',
            title: 'Epuisé',
            description: 'Show stock items which are depleted',
        },
        in_stock: {
            type: 'bool',
            title: 'In Stock',
            description: 'Show items which are in stock',
        },
        is_building: {
            type: 'bool',
            title: 'In Production',
            description: 'Show items which are in production',
        },
        include_variants: {
            type: 'bool',
            title: 'Include Variants',
            description: 'Include stock items for variant parts',
        },
        installed: {
            type: 'bool',
            title: 'Installed',
            description: 'Afficher les articles de stock qui sont installés dans un autre article',
        },
        sent_to_customer: {
            type: 'bool',
            title: 'Envoyé au client',
            description: 'Afficher les articles qui ont été assignés à un client',
        },
        serialized: {
            type: 'bool',
            title: 'A un numéro de série',
        },
        serial: {
            title: 'Numéro de série',
            description: 'Numéro de série',
        },
        serial_gte: {
            title: 'Numéro de série PGE',
            description: 'Numéro de série supérieur ou égal à',
        },
        serial_lte: {
            title: 'Numéro de série PPE',
            description: 'Numéro de série inférieur ou égal à',
        },
        status: {
            options: stockCodes,
            title: 'État du stock',
            description: 'État du stock',
        },
        has_batch: {
            title: 'Has batch code',
            type: 'bool',
        },
        batch: {
            title: 'Lot',
            description: 'Code de lot',
        },
        tracked: {
            title: 'Tracked',
            description: 'Stock item is tracked by either batch code or serial number',
            type: 'bool',
        },
        has_purchase_price: {
            type: 'bool',
            title: 'A un prix d\'achat',
            description: 'Afficher les articles de stock qui ont un prix d\'achat défini',
        },
        expiry_date_lte: {
            type: 'date',
            title: 'Expiry Date before',
        },
        expiry_date_gte: {
            type: 'date',
            title: 'Expiry Date after',
        },
        external: {
            type: 'bool',
            title: 'External Location',
        }
    };

    // Optional filters if stock expiry functionality is enabled
    if (global_settings.STOCK_ENABLE_EXPIRY) {
        filters.expired = {
            type: 'bool',
            title: 'Expired',
            description: 'Afficher les articles de stock qui ont expiré',
        };

        filters.stale = {
            type: 'bool',
            title: 'Stale',
            description: 'Afficher le stock qui est proche de l\'expiration',
        };
    }

    return filters;
}


// Return a dictionary of filters for the "stock tests" table
function getStockTestTableFilters() {

    return {
        result: {
            type: 'bool',
            title: 'Test Passed',
        },
        include_installed: {
            type: 'bool',
            title: 'Include Installed Items',
        }
    };
}


// Return a dictionary of filters for the "stocktracking" table
function getStockTrackingTableFilters() {
    return {};
}


// Return a dictionary of filters for the "part tests" table
function getPartTestTemplateFilters() {
    return {
        required: {
            type: 'bool',
            title: 'Requis',
        },
    };
}


// Return a dictionary of filters for the "plugins" table
function getPluginTableFilters() {
    return {
        active: {
            type: 'bool',
            title: 'Actif',
        },
    };
}


// Return a dictionary of filters for the "build" table
function getBuildTableFilters() {

    let filters = {
        status: {
            title: 'État de la construction',
            options: buildCodes,
        },
        active: {
            type: 'bool',
            title: 'Actif',
        },
        overdue: {
            type: 'bool',
            title: 'En retard',
        },
        assigned_to_me: {
            type: 'bool',
            title: 'Assigné à moi',
        },
        assigned_to: {
            title: 'Responsable',
            options: function() {
                var ownersList = {};
                inventreeGet('/api/user/owner/', {}, {
                    async: false,
                    success: function(response) {
                        for (var key in response) {
                            let owner = response[key];
                            ownersList[owner.pk] = {
                                key: owner.pk,
                                value: `${owner.name} (${owner.label})`,
                            };
                        }
                    }
                });
                return ownersList;
            },
        },
    };

    if (global_settings.PROJECT_CODES_ENABLED) {
        filters['has_project_code'] = constructHasProjectCodeFilter();
        filters['project_code'] = constructProjectCodeFilter();
    }

    return filters;
}


function getBuildItemTableFilters() {
    return {};
}


// Return a dictionary of filters for the "build lines" table
function getBuildLineTableFilters() {
    return {
        allocated: {
            type: 'bool',
            title: 'Allocated',
        },
        available: {
            type: 'bool',
            title: 'Disponible',
        },
        tracked: {
            type: 'bool',
            title: 'Tracked',
        },
        consumable: {
            type: 'bool',
            title: 'Consumable',
        },
        optional: {
            type: 'bool',
            title: 'Optional',
        },
    };
}


// Return a dictionary of filters for the "purchase order line item" table
function getPurchaseOrderLineItemFilters() {
    return {
        pending: {
            type: 'bool',
            title: 'En attente',
        },
        received: {
            type: 'bool',
            title: 'Reçu',
        },
        order_status: {
            title: 'État de la commande',
            options: purchaseOrderCodes,
        },
    };
}


// Return a dictionary of filters for the "purchase order" table
function getPurchaseOrderFilters() {

    var filters = {
        status: {
            title: 'État de la commande',
            options: purchaseOrderCodes,
        },
        outstanding: {
            type: 'bool',
            title: 'En suspens',
        },
        overdue: {
            type: 'bool',
            title: 'En retard',
        },
        assigned_to_me: {
            type: 'bool',
            title: 'Assigné à moi',
        },
    };

    if (global_settings.PROJECT_CODES_ENABLED) {
        filters['has_project_code'] = constructHasProjectCodeFilter();
        filters['project_code'] = constructProjectCodeFilter();
    }

    return filters;
}


// Return a dictionary of filters for the "sales order allocation" table
function getSalesOrderAllocationFilters() {
    return {
        outstanding: {
            type: 'bool',
            title: 'En suspens',
        }
    };
}


// Return a dictionary of filters for the "sales order" table
function getSalesOrderFilters() {
    var filters = {
        status: {
            title: 'État de la commande',
            options: salesOrderCodes,
        },
        outstanding: {
            type: 'bool',
            title: 'En suspens',
        },
        overdue: {
            type: 'bool',
            title: 'En retard',
        },
        assigned_to_me: {
            type: 'bool',
            title: 'Assigné à moi',
        },
    };

    if (global_settings.PROJECT_CODES_ENABLED) {
        filters['has_project_code'] = constructHasProjectCodeFilter();
        filters['project_code'] = constructProjectCodeFilter();
    }

    return filters;
}


// Return a dictionary of filters for the "sales order line item" table
function getSalesOrderLineItemFilters() {
    return {
        completed: {
            type: 'bool',
            title: 'Terminé',
        },
    };
}


// Return a dictionary of filters for the "supplier part" table
function getSupplierPartFilters() {
    return {
        active: {
            type: 'bool',
            title: 'Pièces actives',
        },
    };
}


// Return a dictionary of filters for the "part" table
function getPartTableFilters() {
    return {
        cascade: {
            type: 'bool',
            title: 'Inclure les sous-catégories',
            description: 'Inclure les pièces des sous-catégories',
        },
        active: {
            type: 'bool',
            title: 'Actif',
            description: 'Afficher les pièces actives',
        },
        assembly: {
            type: 'bool',
            title: 'Assemblage',
        },
        unallocated_stock: {
            type: 'bool',
            title: 'Available stock',
        },
        component: {
            type: 'bool',
            title: 'Composant',
        },
        has_units: {
            type: 'bool',
            title: 'Has Units',
            description: 'Part has defined units',
        },
        has_ipn: {
            type: 'bool',
            title: 'A un IPN',
            description: 'La pièce a un numéro de pièce interne',
        },
        has_stock: {
            type: 'bool',
            title: 'In stock',
        },
        low_stock: {
            type: 'bool',
            title: 'Stock bas',
        },
        purchaseable: {
            type: 'bool',
            title: 'Achetable',
        },
        salable: {
            type: 'bool',
            title: 'Vendable',
        },
        starred: {
            type: 'bool',
            title: 'Subscribed',
        },
        stocktake: {
            type: 'bool',
            title: 'Has stocktake entries',
        },
        is_template: {
            type: 'bool',
            title: 'Modèle',
        },
        trackable: {
            type: 'bool',
            title: 'Traçable',
        },
        virtual: {
            type: 'bool',
            title: 'Virtuelle',
        },
        has_pricing: {
            type: 'bool',
            title: 'Has Pricing',
        },
    };
}


// Return a dictionary of filters for the "contact" table
function getContactFilters() {
    return {};
}


// Return a dictionary of filters for the "company" table
function getCompanyFilters() {
    return {
        is_manufacturer: {
            type: 'bool',
            title: 'Fabricant',
        },
        is_supplier: {
            type: 'bool',
            title: 'Fournisseur',
        },
        is_customer: {
            type: 'bool',
            title: 'Client',
        },
    };
}


// Return a dictionary of filters for the "PartParameter" table
function getPartParameterFilters() {
    return {};
}


// Return a dictionary of filters for the "part parameter template" table
function getPartParameterTemplateFilters() {
    return {
        checkbox: {
            type: 'bool',
            title: 'Checkbox',
        },
        has_choices: {
            type: 'bool',
            title: 'Has Choices',
        },
        has_units: {
            type: 'bool',
            title: 'Has Units',
        }
    };
}


// Return a dictionary of filters for the "parameteric part" table
function getParametricPartTableFilters() {
    let filters = getPartTableFilters();

    return filters;
}


// Return a dictionary of filters for a given table, based on the name of the table
function getAvailableTableFilters(tableKey) {

    tableKey = tableKey.toLowerCase();

    switch (tableKey) {
    case 'attachments':
        return getAttachmentFilters();
    case 'build':
        return getBuildTableFilters();
    case 'builditems':
        return getBuildItemTableFilters();
    case 'buildlines':
        return getBuildLineTableFilters();
    case 'bom':
        return getBOMTableFilters();
    case 'category':
        return getPartCategoryFilters();
    case 'company':
        return getCompanyFilters();
    case 'contact':
        return getContactFilters();
    case 'customerstock':
        return getCustomerStockFilters();
    case 'location':
        return getStockLocationFilters();
    case 'parameters':
        return getParametricPartTableFilters();
    case 'part-parameters':
        return getPartParameterFilters();
    case 'part-parameter-templates':
        return getPartParameterTemplateFilters();
    case 'parts':
        return getPartTableFilters();
    case 'parttests':
        return getPartTestTemplateFilters();
    case 'plugins':
        return getPluginTableFilters();
    case 'purchaseorder':
        return getPurchaseOrderFilters();
    case 'purchaseorderlineitem':
        return getPurchaseOrderLineItemFilters();
    case 'related':
        return getRelatedTableFilters();
    case 'returnorder':
        return getReturnOrderFilters();
    case 'returnorderlineitem':
        return getReturnOrderLineItemFilters();
    case 'salesorder':
        return getSalesOrderFilters();
    case 'salesorderallocation':
        return getSalesOrderAllocationFilters();
    case 'salesorderlineitem':
        return getSalesOrderLineItemFilters();
    case 'stock':
        return getStockTableFilters();
    case 'stocktests':
        return getStockTestTableFilters();
    case 'stocktracking':
        return getStockTrackingTableFilters();
    case 'supplierpart':
        return getSupplierPartFilters();
    case 'usedin':
        return getUsedInTableFilters();
    case 'variants':
        return getVariantsTableFilters();
    default:
        console.warn(`No filters defined for table ${tableKey}`);
        return {};
    }
}
