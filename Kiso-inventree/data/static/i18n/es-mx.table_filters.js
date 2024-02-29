



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
        title: 'Código del proyecto',
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
        title: 'Tiene código de proyecto',
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
            title: 'Estado del pedido',
            options: returnOrderCodes
        },
        outstanding: {
            type: 'bool',
            title: 'Pendiente',
        },
        overdue: {
            type: 'bool',
            title: 'Vencido',
        },
        assigned_to_me: {
            type: 'bool',
            title: 'Asignado a mí',
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
            title: 'Recibido',
        },
        outcome: {
            title: 'Resultado',
            options: returnOrderLineItemCodes,
        }
    };
}


// Return a dictionary of filters for the variants table
function getVariantsTableFilters() {
    return {
        active: {
            type: 'bool',
            title: 'Activo',
        },
        template: {
            type: 'bool',
            title: 'Plantilla',
        },
        virtual: {
            type: 'bool',
            title: 'Virtual',
        },
        trackable: {
            type: 'bool',
            title: 'Rastreable',
        },
    };
}


// Return a dictionary of filters for the BOM table
function getBOMTableFilters() {
    return {
        sub_part_trackable: {
            type: 'bool',
            title: 'Parte Rastreable',
        },
        sub_part_assembly: {
            type: 'bool',
            title: 'Parte Ensamblada',
        },
        available_stock: {
            type: 'bool',
            title: 'Tiene stock disponible',
        },
        on_order: {
            type: 'bool',
            title: 'En pedido',
        },
        validated: {
            type: 'bool',
            title: 'Validado',
        },
        inherited: {
            type: 'bool',
            title: 'Gets inherited',
        },
        allow_variants: {
            type: 'bool',
            title: 'Permitir stock de variante',
        },
        optional: {
            type: 'bool',
            title: 'Opcional',
        },
        consumable: {
            type: 'bool',
            title: 'Consumible',
        },
        has_pricing: {
            type: 'bool',
            title: 'Tiene precio',
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
            title: 'Opcional',
        },
        'part_active': {
            type: 'bool',
            title: 'Activo',
        },
        'part_trackable': {
            type: 'bool',
            title: 'Rastreable',
        },
    };
}


// Return a dictionary of filters for the "stock location" table
function getStockLocationFilters() {
    return {
        cascade: {
            type: 'bool',
            title: 'Incluir sub-ubicación',
            description: 'Incluir ubicaciones',
        },
        structural: {
            type: 'bool',
            title: 'Estructural',
        },
        external: {
            type: 'bool',
            title: 'Externo',
        },
    };
}


// Return a dictionary of filters for the "part category" table
function getPartCategoryFilters() {
    return {
        cascade: {
            type: 'bool',
            title: 'Incluir subcategorías',
            description: 'Incluir subcategorías',
        },
        structural: {
            type: 'bool',
            title: 'Estructural',
        },
        starred: {
            type: 'bool',
            title: 'Suscrito',
        },
    };
}


// Return a dictionary of filters for the "customer stock" table
function getCustomerStockFilters() {
    return {
        serialized: {
            type: 'bool',
            title: 'Es Serializado',
        },
        serial_gte: {
            title: 'Número Serial GTE',
            description: 'Número de serie mayor o igual a',
        },
        serial_lte: {
            title: 'Número Serial LTE',
            description: 'Número de serie menor o igual que',
        },
        serial: {
            title: 'Número de serie',
            description: 'Número de serie',
        },
        batch: {
            title: 'Lote',
            description: 'Código de lote',
        },
    };
}


// Return a dictionary of filters for the "stock" table
function getStockTableFilters() {
    var filters = {
        active: {
            type: 'bool',
            title: 'Partes activas',
            description: 'Mostrar stock para las partes activas',
        },
        assembly: {
            type: 'bool',
            title: 'Montaje',
            description: 'Parte es un ensamblado',
        },
        allocated: {
            type: 'bool',
            title: 'Está asignado',
            description: 'El artículo ha sido asignado',
        },
        available: {
            type: 'bool',
            title: 'Disponible',
            description: 'Stock disponible para uso',
        },
        cascade: {
            type: 'bool',
            title: 'Incluir sub-ubicación',
            description: 'Incluye stock en sub-ubicaciones',
        },
        depleted: {
            type: 'bool',
            title: 'Agotado',
            description: 'Mostrar artículos de stock que están agotados',
        },
        in_stock: {
            type: 'bool',
            title: 'En Stock',
            description: 'Mostrar artículos en stock',
        },
        is_building: {
            type: 'bool',
            title: 'En Producción',
            description: 'Mostrar artículos que están en producción',
        },
        include_variants: {
            type: 'bool',
            title: 'Incluye Variantes',
            description: 'Incluye artículos de stock para partes de variantes',
        },
        installed: {
            type: 'bool',
            title: 'Instalado',
            description: 'Mostrar artículos de stock que están instalados en otro artículo',
        },
        sent_to_customer: {
            type: 'bool',
            title: 'Enviar al cliente',
            description: 'Mostrar artículos que han sido asignados a un cliente',
        },
        serialized: {
            type: 'bool',
            title: 'Es Serializado',
        },
        serial: {
            title: 'Número de serie',
            description: 'Número de serie',
        },
        serial_gte: {
            title: 'Número Serial GTE',
            description: 'Número de serie mayor o igual a',
        },
        serial_lte: {
            title: 'Número Serial LTE',
            description: 'Número de serie menor o igual que',
        },
        status: {
            options: stockCodes,
            title: 'Estado del stock',
            description: 'Estado del stock',
        },
        has_batch: {
            title: 'Tiene código de lote',
            type: 'bool',
        },
        batch: {
            title: 'Lote',
            description: 'Código de lote',
        },
        tracked: {
            title: 'Rastreado',
            description: 'Stock item is tracked by either batch code or serial number',
            type: 'bool',
        },
        has_purchase_price: {
            type: 'bool',
            title: 'Tiene precio de compra',
            description: 'Mostrar artículos de stock que tienen un precio de compra establecido',
        },
        expiry_date_lte: {
            type: 'date',
            title: 'Fecha de vencimiento antes de',
        },
        expiry_date_gte: {
            type: 'date',
            title: 'Fecha de vencimiento después',
        },
        external: {
            type: 'bool',
            title: 'Ubicación externa',
        }
    };

    // Optional filters if stock expiry functionality is enabled
    if (global_settings.STOCK_ENABLE_EXPIRY) {
        filters.expired = {
            type: 'bool',
            title: 'Expirado',
            description: 'Mostrar artículos de stock que han caducado',
        };

        filters.stale = {
            type: 'bool',
            title: 'Desactualizado',
            description: 'Mostrar stock que está cerca de caducar',
        };
    }

    return filters;
}


// Return a dictionary of filters for the "stock tests" table
function getStockTestTableFilters() {

    return {
        result: {
            type: 'bool',
            title: 'Prueba aprobada',
        },
        include_installed: {
            type: 'bool',
            title: 'Incluye artículos instalados',
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
            title: 'Requerido',
        },
    };
}


// Return a dictionary of filters for the "plugins" table
function getPluginTableFilters() {
    return {
        active: {
            type: 'bool',
            title: 'Activo',
        },
    };
}


// Return a dictionary of filters for the "build" table
function getBuildTableFilters() {

    let filters = {
        status: {
            title: 'Estado de la construcción',
            options: buildCodes,
        },
        active: {
            type: 'bool',
            title: 'Activo',
        },
        overdue: {
            type: 'bool',
            title: 'Vencido',
        },
        assigned_to_me: {
            type: 'bool',
            title: 'Asignado a mí',
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
            title: 'Asignadas',
        },
        available: {
            type: 'bool',
            title: 'Disponible',
        },
        tracked: {
            type: 'bool',
            title: 'Rastreado',
        },
        consumable: {
            type: 'bool',
            title: 'Consumible',
        },
        optional: {
            type: 'bool',
            title: 'Opcional',
        },
    };
}


// Return a dictionary of filters for the "purchase order line item" table
function getPurchaseOrderLineItemFilters() {
    return {
        pending: {
            type: 'bool',
            title: 'Pendiente',
        },
        received: {
            type: 'bool',
            title: 'Recibido',
        },
        order_status: {
            title: 'Estado del pedido',
            options: purchaseOrderCodes,
        },
    };
}


// Return a dictionary of filters for the "purchase order" table
function getPurchaseOrderFilters() {

    var filters = {
        status: {
            title: 'Estado del pedido',
            options: purchaseOrderCodes,
        },
        outstanding: {
            type: 'bool',
            title: 'Pendiente',
        },
        overdue: {
            type: 'bool',
            title: 'Vencido',
        },
        assigned_to_me: {
            type: 'bool',
            title: 'Asignado a mí',
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
            title: 'Pendiente',
        }
    };
}


// Return a dictionary of filters for the "sales order" table
function getSalesOrderFilters() {
    var filters = {
        status: {
            title: 'Estado del pedido',
            options: salesOrderCodes,
        },
        outstanding: {
            type: 'bool',
            title: 'Pendiente',
        },
        overdue: {
            type: 'bool',
            title: 'Vencido',
        },
        assigned_to_me: {
            type: 'bool',
            title: 'Asignado a mí',
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
            title: 'Completados',
        },
    };
}


// Return a dictionary of filters for the "supplier part" table
function getSupplierPartFilters() {
    return {
        active: {
            type: 'bool',
            title: 'Partes activas',
        },
    };
}


// Return a dictionary of filters for the "part" table
function getPartTableFilters() {
    return {
        cascade: {
            type: 'bool',
            title: 'Incluir subcategorías',
            description: 'Incluye partes en subcategorías',
        },
        active: {
            type: 'bool',
            title: 'Activo',
            description: 'Mostrar partes activas',
        },
        assembly: {
            type: 'bool',
            title: 'Montaje',
        },
        unallocated_stock: {
            type: 'bool',
            title: 'Existencias disponibles',
        },
        component: {
            type: 'bool',
            title: 'Componente',
        },
        has_units: {
            type: 'bool',
            title: 'Tiene unidades',
            description: 'Part has defined units',
        },
        has_ipn: {
            type: 'bool',
            title: 'Tiene IPN',
            description: 'La parte tiene un número de parte interno',
        },
        has_stock: {
            type: 'bool',
            title: 'En existencia',
        },
        low_stock: {
            type: 'bool',
            title: 'Stock bajo',
        },
        purchaseable: {
            type: 'bool',
            title: 'Comprable',
        },
        salable: {
            type: 'bool',
            title: 'Vendible',
        },
        starred: {
            type: 'bool',
            title: 'Suscrito',
        },
        stocktake: {
            type: 'bool',
            title: 'Tiene entradas de inventario',
        },
        is_template: {
            type: 'bool',
            title: 'Plantilla',
        },
        trackable: {
            type: 'bool',
            title: 'Rastreable',
        },
        virtual: {
            type: 'bool',
            title: 'Virtual',
        },
        has_pricing: {
            type: 'bool',
            title: 'Tiene precio',
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
            title: 'Fabricante',
        },
        is_supplier: {
            type: 'bool',
            title: 'Proveedor',
        },
        is_customer: {
            type: 'bool',
            title: 'Cliente',
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
            title: 'Tiene opciones',
        },
        has_units: {
            type: 'bool',
            title: 'Tiene unidades',
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
