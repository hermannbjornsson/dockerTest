



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
        title: 'Codice del progetto',
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
        title: 'Ha il codice del progetto',
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
            title: 'Stato dell\'ordine',
            options: returnOrderCodes
        },
        outstanding: {
            type: 'bool',
            title: 'In Sospeso',
        },
        overdue: {
            type: 'bool',
            title: 'In ritardo',
        },
        assigned_to_me: {
            type: 'bool',
            title: 'Assegnato a me',
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
            title: 'Ricevuto',
        },
        outcome: {
            title: 'Risultati',
            options: returnOrderLineItemCodes,
        }
    };
}


// Return a dictionary of filters for the variants table
function getVariantsTableFilters() {
    return {
        active: {
            type: 'bool',
            title: 'Attivo',
        },
        template: {
            type: 'bool',
            title: 'Modello',
        },
        virtual: {
            type: 'bool',
            title: 'Virtuale',
        },
        trackable: {
            type: 'bool',
            title: 'Tracciabile',
        },
    };
}


// Return a dictionary of filters for the BOM table
function getBOMTableFilters() {
    return {
        sub_part_trackable: {
            type: 'bool',
            title: 'Articolo tracciabile',
        },
        sub_part_assembly: {
            type: 'bool',
            title: 'Articolo assemblato',
        },
        available_stock: {
            type: 'bool',
            title: 'Ha scorte disponibili',
        },
        on_order: {
            type: 'bool',
            title: 'Ordinato',
        },
        validated: {
            type: 'bool',
            title: 'Convalidato',
        },
        inherited: {
            type: 'bool',
            title: 'Gets inherited',
        },
        allow_variants: {
            type: 'bool',
            title: 'Varianti consentite',
        },
        optional: {
            type: 'bool',
            title: 'Opzionale',
        },
        consumable: {
            type: 'bool',
            title: 'Consumabile',
        },
        has_pricing: {
            type: 'bool',
            title: 'Prezzo',
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
            title: 'Opzionale',
        },
        'part_active': {
            type: 'bool',
            title: 'Attivo',
        },
        'part_trackable': {
            type: 'bool',
            title: 'Tracciabile',
        },
    };
}


// Return a dictionary of filters for the "stock location" table
function getStockLocationFilters() {
    return {
        cascade: {
            type: 'bool',
            title: 'Includi sottoallocazioni/posizioni',
            description: 'Includi posizioni',
        },
        structural: {
            type: 'bool',
            title: 'Strutturale',
        },
        external: {
            type: 'bool',
            title: 'Esterno',
        },
    };
}


// Return a dictionary of filters for the "part category" table
function getPartCategoryFilters() {
    return {
        cascade: {
            type: 'bool',
            title: 'Includi sottocategorie',
            description: 'Includi sottocategorie',
        },
        structural: {
            type: 'bool',
            title: 'Strutturale',
        },
        starred: {
            type: 'bool',
            title: 'Sottoscritto',
        },
    };
}


// Return a dictionary of filters for the "customer stock" table
function getCustomerStockFilters() {
    return {
        serialized: {
            type: 'bool',
            title: 'E\' Serializzato',
        },
        serial_gte: {
            title: 'Numero di serie GTE',
            description: 'Numero di serie maggiore di o uguale a',
        },
        serial_lte: {
            title: 'Numero di serie LTE',
            description: 'Numero di serie inferiore di o uguale a',
        },
        serial: {
            title: 'Numero di serie',
            description: 'Numero di serie',
        },
        batch: {
            title: 'Lotto',
            description: 'Codice Lotto',
        },
    };
}


// Return a dictionary of filters for the "stock" table
function getStockTableFilters() {
    var filters = {
        active: {
            type: 'bool',
            title: 'Elementi attivi',
            description: 'Mostra stock per gli articoli attivi',
        },
        assembly: {
            type: 'bool',
            title: 'Assemblaggio',
            description: 'L\'articolo è un assemblato',
        },
        allocated: {
            type: 'bool',
            title: 'È assegnato',
            description: 'L\'elemento è stato posizionato',
        },
        available: {
            type: 'bool',
            title: 'Disponibile',
            description: 'Stock disponibile per l\'utilizzo',
        },
        cascade: {
            type: 'bool',
            title: 'Includi sottoallocazioni/posizioni',
            description: 'Includi elementi in giacenza nelle sottoallocazioni',
        },
        depleted: {
            type: 'bool',
            title: 'Esaurito',
            description: 'Mostra gli elementi di magazzino che sono esauriti',
        },
        in_stock: {
            type: 'bool',
            title: 'In magazzino',
            description: 'Mostra gli elementi che sono in giacenza',
        },
        is_building: {
            type: 'bool',
            title: 'In Produzione',
            description: 'Mostra gli elementi in produzione',
        },
        include_variants: {
            type: 'bool',
            title: 'Includi Varianti',
            description: 'Includi gli articoli stock per le varianti degli articoli',
        },
        installed: {
            type: 'bool',
            title: 'Installato',
            description: 'Mostra gli elementi stock che sono installati in un altro elemento',
        },
        sent_to_customer: {
            type: 'bool',
            title: 'Inviato al cliente',
            description: 'Mostra elementi che sono stati assegnati a un cliente',
        },
        serialized: {
            type: 'bool',
            title: 'E\' Serializzato',
        },
        serial: {
            title: 'Numero di serie',
            description: 'Numero di serie',
        },
        serial_gte: {
            title: 'Numero di serie GTE',
            description: 'Numero di serie maggiore di o uguale a',
        },
        serial_lte: {
            title: 'Numero di serie LTE',
            description: 'Numero di serie inferiore di o uguale a',
        },
        status: {
            options: stockCodes,
            title: 'Stato magazzino',
            description: 'Stato magazzino',
        },
        has_batch: {
            title: 'Ha codice lotto',
            type: 'bool',
        },
        batch: {
            title: 'Lotto',
            description: 'Codice Lotto',
        },
        tracked: {
            title: 'Monitorato',
            description: 'L\'articolo stock è monitorato dal codice lotto o dal numero di serie',
            type: 'bool',
        },
        has_purchase_price: {
            type: 'bool',
            title: 'Ha il prezzo d\'acquisto',
            description: 'Mostra gli articoli di magazzino che hanno un prezzo di acquisto impostato',
        },
        expiry_date_lte: {
            type: 'date',
            title: 'Data di scadenza precedente',
        },
        expiry_date_gte: {
            type: 'date',
            title: 'Data di scadenza successiva',
        },
        external: {
            type: 'bool',
            title: 'Ubicazione Esterna',
        }
    };

    // Optional filters if stock expiry functionality is enabled
    if (global_settings.STOCK_ENABLE_EXPIRY) {
        filters.expired = {
            type: 'bool',
            title: 'Scaduto',
            description: 'Mostra gli elementi in giacenza scaduti',
        };

        filters.stale = {
            type: 'bool',
            title: 'Obsoleto',
            description: 'Mostra giacenza prossima alla scadenza',
        };
    }

    return filters;
}


// Return a dictionary of filters for the "stock tests" table
function getStockTestTableFilters() {

    return {
        result: {
            type: 'bool',
            title: 'Test superato',
        },
        include_installed: {
            type: 'bool',
            title: 'Includi Elementi Installati',
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
            title: 'Richiesto',
        },
    };
}


// Return a dictionary of filters for the "plugins" table
function getPluginTableFilters() {
    return {
        active: {
            type: 'bool',
            title: 'Attivo',
        },
    };
}


// Return a dictionary of filters for the "build" table
function getBuildTableFilters() {

    let filters = {
        status: {
            title: 'Stato Build',
            options: buildCodes,
        },
        active: {
            type: 'bool',
            title: 'Attivo',
        },
        overdue: {
            type: 'bool',
            title: 'In ritardo',
        },
        assigned_to_me: {
            type: 'bool',
            title: 'Assegnato a me',
        },
        assigned_to: {
            title: 'Responsabile',
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
            title: 'Allocato',
        },
        available: {
            type: 'bool',
            title: 'Disponibile',
        },
        tracked: {
            type: 'bool',
            title: 'Monitorato',
        },
        consumable: {
            type: 'bool',
            title: 'Consumabile',
        },
        optional: {
            type: 'bool',
            title: 'Opzionale',
        },
    };
}


// Return a dictionary of filters for the "purchase order line item" table
function getPurchaseOrderLineItemFilters() {
    return {
        pending: {
            type: 'bool',
            title: 'In attesa',
        },
        received: {
            type: 'bool',
            title: 'Ricevuto',
        },
        order_status: {
            title: 'Stato dell\'ordine',
            options: purchaseOrderCodes,
        },
    };
}


// Return a dictionary of filters for the "purchase order" table
function getPurchaseOrderFilters() {

    var filters = {
        status: {
            title: 'Stato dell\'ordine',
            options: purchaseOrderCodes,
        },
        outstanding: {
            type: 'bool',
            title: 'In Sospeso',
        },
        overdue: {
            type: 'bool',
            title: 'In ritardo',
        },
        assigned_to_me: {
            type: 'bool',
            title: 'Assegnato a me',
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
            title: 'In Sospeso',
        }
    };
}


// Return a dictionary of filters for the "sales order" table
function getSalesOrderFilters() {
    var filters = {
        status: {
            title: 'Stato dell\'ordine',
            options: salesOrderCodes,
        },
        outstanding: {
            type: 'bool',
            title: 'In Sospeso',
        },
        overdue: {
            type: 'bool',
            title: 'In ritardo',
        },
        assigned_to_me: {
            type: 'bool',
            title: 'Assegnato a me',
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
            title: 'Completato',
        },
    };
}


// Return a dictionary of filters for the "supplier part" table
function getSupplierPartFilters() {
    return {
        active: {
            type: 'bool',
            title: 'Elementi attivi',
        },
    };
}


// Return a dictionary of filters for the "part" table
function getPartTableFilters() {
    return {
        cascade: {
            type: 'bool',
            title: 'Includi sottocategorie',
            description: 'Includi articoli nelle sottocategorie',
        },
        active: {
            type: 'bool',
            title: 'Attivo',
            description: 'Visualizza articoli attivi',
        },
        assembly: {
            type: 'bool',
            title: 'Assemblaggio',
        },
        unallocated_stock: {
            type: 'bool',
            title: 'Stock disponibile',
        },
        component: {
            type: 'bool',
            title: 'Componente',
        },
        has_units: {
            type: 'bool',
            title: 'Has Units',
            description: 'Part has defined units',
        },
        has_ipn: {
            type: 'bool',
            title: 'Ha IPN',
            description: 'L\'articolo possiede un part number interno',
        },
        has_stock: {
            type: 'bool',
            title: 'In giacenza',
        },
        low_stock: {
            type: 'bool',
            title: 'In esaurimento',
        },
        purchaseable: {
            type: 'bool',
            title: 'Acquistabile',
        },
        salable: {
            type: 'bool',
            title: 'Vendibile',
        },
        starred: {
            type: 'bool',
            title: 'Sottoscritto',
        },
        stocktake: {
            type: 'bool',
            title: 'Ha voci d\'inventario',
        },
        is_template: {
            type: 'bool',
            title: 'Modello',
        },
        trackable: {
            type: 'bool',
            title: 'Tracciabile',
        },
        virtual: {
            type: 'bool',
            title: 'Virtuale',
        },
        has_pricing: {
            type: 'bool',
            title: 'Prezzo',
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
            title: 'Produttore',
        },
        is_supplier: {
            type: 'bool',
            title: 'Fornitore',
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
