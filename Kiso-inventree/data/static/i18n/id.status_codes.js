



/* globals
*/

/* exported
    buildStatusDisplay,
    purchaseOrderStatusDisplay,
    returnOrderStatusDisplay,
    returnOrderLineItemStatusDisplay,
    salesOrderStatusDisplay,
    stockHistoryStatusDisplay,
    stockStatusDisplay,
*/


/*
 * Generic function to render a status label
 */
function renderStatusLabel(key, codes, options={}) {

    let text = null;
    let label = null;

    // Find the entry which matches the provided key
    for (var name in codes) {
        let entry = codes[name];

        if (entry.key == key) {
            text = entry.value;
            label = entry.label;
            break;
        }
    }

    if (!text) {
        console.error(`renderStatusLabel could not find match for code ${key}`);
    }

    // Fallback for color
    label = label || 'bg-dark';

    if (!text) {
        text = key;
    }

    let classes = `badge rounded-pill ${label}`;

    if (options.classes) {
        classes += ` ${options.classes}`;
    }

    return `<span class='${classes}'>${text}</span>`;
}



/*
 * Status codes for the stock model.
 * Generated from the values specified in "status_codes.py"
 */
const stockCodes = {
    
    'OK': {
        key: 10,
        value: 'OK',
        label: 'bg-success',
    },
    
    'ATTENTION': {
        key: 50,
        value: 'Butuh perhatian',
        label: 'bg-warning',
    },
    
    'DAMAGED': {
        key: 55,
        value: 'Rusak',
        label: 'bg-warning',
    },
    
    'DESTROYED': {
        key: 60,
        value: 'Hancur',
        label: 'bg-danger',
    },
    
    'REJECTED': {
        key: 65,
        value: 'Ditolak',
        label: 'bg-danger',
    },
    
    'LOST': {
        key: 70,
        value: 'Hilang',
        label: 'bg-dark',
    },
    
    'QUARANTINED': {
        key: 75,
        value: 'Quarantined',
        label: 'bg-info',
    },
    
    'RETURNED': {
        key: 85,
        value: 'Dikembalikan',
        label: 'bg-warning',
    },
    
};

/*
 * Render the status for a stock object.
 * Uses the values specified in "status_codes.py"
 */
function stockStatusDisplay(key, options={}) {
    return renderStatusLabel(key, stockCodes, options);
}



/*
 * Status codes for the stockHistory model.
 * Generated from the values specified in "status_codes.py"
 */
const stockHistoryCodes = {
    
    'LEGACY': {
        key: 0,
        value: 'Legacy stock tracking entry',
        label: 'bg-secondary',
    },
    
    'CREATED': {
        key: 1,
        value: 'Item stok dibuat',
        label: 'bg-secondary',
    },
    
    'EDITED': {
        key: 5,
        value: 'Item stok diubah',
        label: 'bg-secondary',
    },
    
    'ASSIGNED_SERIAL': {
        key: 6,
        value: 'Nomor seri yang ditetapkan',
        label: 'bg-secondary',
    },
    
    'STOCK_COUNT': {
        key: 10,
        value: 'Stok terhitung',
        label: 'bg-secondary',
    },
    
    'STOCK_ADD': {
        key: 11,
        value: 'Stok yang ditambahkan manual',
        label: 'bg-secondary',
    },
    
    'STOCK_REMOVE': {
        key: 12,
        value: 'Stok yang dikurangi manual',
        label: 'bg-secondary',
    },
    
    'STOCK_MOVE': {
        key: 20,
        value: 'Lokasi berubah',
        label: 'bg-secondary',
    },
    
    'STOCK_UPDATE': {
        key: 25,
        value: 'Stock updated',
        label: 'bg-secondary',
    },
    
    'INSTALLED_INTO_ASSEMBLY': {
        key: 30,
        value: 'Dirakit ke',
        label: 'bg-secondary',
    },
    
    'REMOVED_FROM_ASSEMBLY': {
        key: 31,
        value: 'Diambil dari',
        label: 'bg-secondary',
    },
    
    'INSTALLED_CHILD_ITEM': {
        key: 35,
        value: 'Komponen terpasang',
        label: 'bg-secondary',
    },
    
    'REMOVED_CHILD_ITEM': {
        key: 36,
        value: 'Komponen terlepas',
        label: 'bg-secondary',
    },
    
    'SPLIT_FROM_PARENT': {
        key: 40,
        value: 'Dipisah dari item induk',
        label: 'bg-secondary',
    },
    
    'SPLIT_CHILD_ITEM': {
        key: 42,
        value: 'Pisah item dari barang induk',
        label: 'bg-secondary',
    },
    
    'MERGED_STOCK_ITEMS': {
        key: 45,
        value: 'Stok item digabungkan',
        label: 'bg-secondary',
    },
    
    'CONVERTED_TO_VARIANT': {
        key: 48,
        value: 'Dikonversi ke variasi',
        label: 'bg-secondary',
    },
    
    'BUILD_OUTPUT_CREATED': {
        key: 50,
        value: 'Output order produksi dibuat',
        label: 'bg-secondary',
    },
    
    'BUILD_OUTPUT_COMPLETED': {
        key: 55,
        value: 'Order output produksi selesai',
        label: 'bg-secondary',
    },
    
    'BUILD_OUTPUT_REJECTED': {
        key: 56,
        value: 'Build order output rejected',
        label: 'bg-secondary',
    },
    
    'BUILD_CONSUMED': {
        key: 57,
        value: 'Terpakai oleh order produksi',
        label: 'bg-secondary',
    },
    
    'SHIPPED_AGAINST_SALES_ORDER': {
        key: 60,
        value: 'Shipped against Sales Order',
        label: 'bg-secondary',
    },
    
    'RECEIVED_AGAINST_PURCHASE_ORDER': {
        key: 70,
        value: 'Received against Purchase Order',
        label: 'bg-secondary',
    },
    
    'RETURNED_AGAINST_RETURN_ORDER': {
        key: 80,
        value: 'Returned against Return Order',
        label: 'bg-secondary',
    },
    
    'SENT_TO_CUSTOMER': {
        key: 100,
        value: 'Terkirim ke pelanggan',
        label: 'bg-secondary',
    },
    
    'RETURNED_FROM_CUSTOMER': {
        key: 105,
        value: 'Dikembalikan pelanggan',
        label: 'bg-secondary',
    },
    
};

/*
 * Render the status for a stockHistory object.
 * Uses the values specified in "status_codes.py"
 */
function stockHistoryStatusDisplay(key, options={}) {
    return renderStatusLabel(key, stockHistoryCodes, options);
}



/*
 * Status codes for the build model.
 * Generated from the values specified in "status_codes.py"
 */
const buildCodes = {
    
    'PENDING': {
        key: 10,
        value: 'Pending',
        label: 'bg-secondary',
    },
    
    'PRODUCTION': {
        key: 20,
        value: 'Produksi',
        label: 'bg-primary',
    },
    
    'CANCELLED': {
        key: 30,
        value: 'Dibatalkan',
        label: 'bg-danger',
    },
    
    'COMPLETE': {
        key: 40,
        value: 'Selesai',
        label: 'bg-success',
    },
    
};

/*
 * Render the status for a build object.
 * Uses the values specified in "status_codes.py"
 */
function buildStatusDisplay(key, options={}) {
    return renderStatusLabel(key, buildCodes, options);
}



/*
 * Status codes for the purchaseOrder model.
 * Generated from the values specified in "status_codes.py"
 */
const purchaseOrderCodes = {
    
    'PENDING': {
        key: 10,
        value: 'Pending',
        label: 'bg-secondary',
    },
    
    'PLACED': {
        key: 20,
        value: 'Diletakkan',
        label: 'bg-primary',
    },
    
    'COMPLETE': {
        key: 30,
        value: 'Selesai',
        label: 'bg-success',
    },
    
    'CANCELLED': {
        key: 40,
        value: 'Dibatalkan',
        label: 'bg-danger',
    },
    
    'LOST': {
        key: 50,
        value: 'Hilang',
        label: 'bg-warning',
    },
    
    'RETURNED': {
        key: 60,
        value: 'Dikembalikan',
        label: 'bg-warning',
    },
    
};

/*
 * Render the status for a purchaseOrder object.
 * Uses the values specified in "status_codes.py"
 */
function purchaseOrderStatusDisplay(key, options={}) {
    return renderStatusLabel(key, purchaseOrderCodes, options);
}



/*
 * Status codes for the salesOrder model.
 * Generated from the values specified in "status_codes.py"
 */
const salesOrderCodes = {
    
    'PENDING': {
        key: 10,
        value: 'Pending',
        label: 'bg-secondary',
    },
    
    'IN_PROGRESS': {
        key: 15,
        value: 'In Progress',
        label: 'bg-primary',
    },
    
    'SHIPPED': {
        key: 20,
        value: 'Dikirim',
        label: 'bg-success',
    },
    
    'CANCELLED': {
        key: 40,
        value: 'Dibatalkan',
        label: 'bg-danger',
    },
    
    'LOST': {
        key: 50,
        value: 'Hilang',
        label: 'bg-warning',
    },
    
    'RETURNED': {
        key: 60,
        value: 'Dikembalikan',
        label: 'bg-warning',
    },
    
};

/*
 * Render the status for a salesOrder object.
 * Uses the values specified in "status_codes.py"
 */
function salesOrderStatusDisplay(key, options={}) {
    return renderStatusLabel(key, salesOrderCodes, options);
}



/*
 * Status codes for the returnOrder model.
 * Generated from the values specified in "status_codes.py"
 */
const returnOrderCodes = {
    
    'PENDING': {
        key: 10,
        value: 'Pending',
        label: 'bg-secondary',
    },
    
    'IN_PROGRESS': {
        key: 20,
        value: 'In Progress',
        label: 'bg-primary',
    },
    
    'COMPLETE': {
        key: 30,
        value: 'Selesai',
        label: 'bg-success',
    },
    
    'CANCELLED': {
        key: 40,
        value: 'Dibatalkan',
        label: 'bg-danger',
    },
    
};

/*
 * Render the status for a returnOrder object.
 * Uses the values specified in "status_codes.py"
 */
function returnOrderStatusDisplay(key, options={}) {
    return renderStatusLabel(key, returnOrderCodes, options);
}



/*
 * Status codes for the returnOrderLineItem model.
 * Generated from the values specified in "status_codes.py"
 */
const returnOrderLineItemCodes = {
    
    'PENDING': {
        key: 10,
        value: 'Pending',
        label: 'bg-secondary',
    },
    
    'RETURN': {
        key: 20,
        value: 'Return',
        label: 'bg-success',
    },
    
    'REPAIR': {
        key: 30,
        value: 'Repair',
        label: 'bg-primary',
    },
    
    'REPLACE': {
        key: 40,
        value: 'Replace',
        label: 'bg-warning',
    },
    
    'REFUND': {
        key: 50,
        value: 'Refund',
        label: 'bg-info',
    },
    
    'REJECT': {
        key: 60,
        value: 'Reject',
        label: 'bg-danger',
    },
    
};

/*
 * Render the status for a returnOrderLineItem object.
 * Uses the values specified in "status_codes.py"
 */
function returnOrderLineItemStatusDisplay(key, options={}) {
    return renderStatusLabel(key, returnOrderLineItemCodes, options);
}

