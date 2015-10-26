namespace App.Layout {
    "use strict";
    import LoggerService = Blocks.Logging.LoggerService;
    export class CalculatorController {
        static $inject: Array<string> = ['$rootScope', 'config', 'logger'];
        public title: string;
        public valor: number;
        public porcentaje: number;
        public impuestos: number;
        public total: number;

        constructor(private $rootScope: any, private config: { appTitle: string }, private logger: LoggerService) {
            this.title = config.appTitle;
            this.valor = 0;
            this.porcentaje = 21;
            this.impuestos = 0;
            this.total = 0;
            
            this.logger.info(this.title + ' loaded!', null);
        }

        public onChange(): void {
            try {
                this.total = parseFloat((this.valor * (1 + this.porcentaje / 100)).toFixed(2));
                this.impuestos = parseFloat((this.total - this.valor).toFixed(2));
            } catch (e) {
                this.logger.error("onChange", e);
            }
        }

        public onChangeTotal(): void {
            try {
                this.valor = parseFloat((this.total / (1 + this.porcentaje / 100)).toFixed(2));
                this.impuestos = parseFloat((this.total - this.valor).toFixed(2));
            } catch (e) {
                this.logger.error("onChangeTotal", e);
            }
        }
    }

    angular
        .module('app.layout')
        .controller('CalculatorController', CalculatorController);
}