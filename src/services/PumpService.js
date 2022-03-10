import axios from 'axios';
import EndPoints from './EndPoints';

export const PumpService = {

    async getAllMachines() {
        const url = EndPoints.pumpService.machines;
        try {
            return await axios
                .get(url)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },
    async addMachine(data) {
        const url = EndPoints.pumpService.addMachine;
        try {
            return await axios
                .post(url, data)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },

    async addNozzle(data) {
        const url = EndPoints.pumpService.addNozzle;
        console.log(data);
        try {
            return await axios
                .post(url, data)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },
    async getMeterReadings(date) {
        console.log(date)
        const url = EndPoints.pumpService.meterReadingTemplate;
        try {
            return await axios
                .post(url,date)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },
    async addMeterReadings(data) {
        const url = EndPoints.pumpService.addMeterReading;
        try {
            return await axios
                .post(url, data)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },
    async getStocks(data) {
        const url = EndPoints.pumpService.stocks+"/rates/bydate";
        try {
            return await axios
                .post(url, data)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },
    async addRate(data) {
        const url = EndPoints.pumpService.addRate;
        try {
            return await axios
                .post(url, data)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },
    
    async addStock(data) {
        const url = EndPoints.pumpService.stocks+"/types";
        try {
            return await axios
                .post(url, data)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },
    async getDailySales(page,size) {
        const url = EndPoints.pumpService.sales+"?page="+page+"&size="+size;
        try {
            return await axios
                .get(url)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },
    
    async getAllStockTypes() {
        const url = EndPoints.pumpService.stocks+"/types";
        try {
            return await axios
                .get(url)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },
    async addSale(data) {
        const url = EndPoints.pumpService.sales;
        try {
            return await axios
                .post(url,data)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },

    async updateRate(data) {
        const url = EndPoints.pumpService.stocks+"/rates";
        try {
            return await axios
                .post(url,data)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },
    
    async getAllExpenses(page,size) {
        const url = EndPoints.pumpService.expenses+"?page="+page+"&size="+size;
        try {
            return await axios
                .get(url)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },
    async getAllExpenseTypes() {
        const url = EndPoints.pumpService.expenses+"/types";
        try {
            return await axios
                .get(url)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },

    async addExpense(data) {
        const url = EndPoints.pumpService.expenses;
        try {
            return await axios
                .post(url,data)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },

    async addCustomerLedger(data) {
        const url = EndPoints.pumpService.customerLedger;
        try {
            return await axios
                .post(url,data)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },

    async getAllCustomerLedgers() {
        const url = EndPoints.pumpService.customerLedger+'/list';
        try {
            return await axios
                .get(url)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },

    async getCustomerLedgerById(id) {
        const url = EndPoints.pumpService.customerLedger+'/'+id+"/credit-debit-info";
        try {
            return await axios
                .get(url)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },

    async addBankLedger(data) {
        const url = EndPoints.pumpService.bankLedger;
        try {
            return await axios
                .post(url,data)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },

    async getAllBankLedgers() {
        const url = EndPoints.pumpService.bankLedger+'/list';
        try {
            return await axios
                .get(url)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },

    async getBankLedgerById(id) {
        const url = EndPoints.pumpService.bankLedger+'/'+id;
        try {
            return await axios
                .get(url)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },

    async addBankLedgerEntry(data) {
        const url = EndPoints.pumpService.bankLedger+'/credit-debit';
        try {
            return await axios
                .post(url,data)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },

    async stockRateHistoryUpcoming(data,id) {
        const url = EndPoints.pumpService.stockRateHistoryUpcoming+'/'+id+"/rates/record";
        try {
            return await axios
                .post(url,data)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },

    async deleteNozzleEntry(data) {
        const url = EndPoints.pumpService.machines;
        try {
            return await axios
                .delete(url,{data:data})
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },

    async editNozzleEntry(data) {
        const url = EndPoints.pumpService.machines;
        try {
            return await axios
                .put(url,data)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },

    async deleteMeterReadingEntry(id, data) {
        const url = EndPoints.pumpService.meterReading + '/' + id;
        try {
            return await axios
                .delete(url,{data:data})
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },

    async addSupplierLedgerEntry(data) {
        const url = EndPoints.pumpService.supplierLedger;
        try {
            return await axios
                .post(url,data)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },

    async getSupplierLedgers() {
        const url = EndPoints.pumpService.supplierLedger;
        try {
            return await axios
                .get(url)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },

    async editSupplierLedgers(data) {
        const url = EndPoints.pumpService.supplierLedger;
        try {
            return await axios
                .put(url, data)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },

    async deleteSupplierLedger(id) {
        const url = EndPoints.pumpService.supplierLedger + '/' + id;
        try {
            return await axios
                .delete(url)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },

    async getSupplierLedgerById(id) {
        const url = EndPoints.pumpService.supplierLedger + '/' + id;
        try {
            return await axios
                .get(url)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },

    async getSupplierLedgerItems(id) {
        const url = EndPoints.pumpService.supplierLedger + '/' + id + '/ledgerItems';
        try {
            return await axios
                .get(url)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },

    async deleteSupplierLedgerItem(supplierLedgerId, itemId) {
        const url = EndPoints.pumpService.supplierLedger + '/' + supplierLedgerId + '/ledgerItems/' + itemId;
        try {
            return await axios
                .delete(url)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },

    async addSupplierLedgerItem(id, data) {
        const url = EndPoints.pumpService.supplierLedger + '/' + id + '/ledgerItems';
        try {
            return await axios
                .post(url, data)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    throw error;
                });
        } catch (e) {
            throw e;
        }
    },

    // /rates/record/stocks/{stockTypeId}
};