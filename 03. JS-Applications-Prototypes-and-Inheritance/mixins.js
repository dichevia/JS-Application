function createMixins() {
    function computerQualityMixin(classToExtend) {
        classToExtend.prototype.getQuality = function () {
            return (this.processorSpeed + this.ram + this.hardDiskSpace) / 3
        }
        classToExtend.prototype.isFast = function () {
            if (this.processorSpeed > (this.ram / 4)) {
                return true
            }
            return false
        }

        classToExtend.prototype.isRoomy = function () {
            if (this.hardDiskSpace > Math.floor(this.ram * this.processorSpeed)) {
                return true
            }
            return false
        }
    }

    function styleMixin(classToExtend) {
        classToExtend.prototype.isFullSet = function () {
            let args = [this.manufacturer, this.keyboard.manufacturer, this.monitor.manufacturer];
            let manufacturer = this.manufacturer;

            if (args.every(e => e === manufacturer)) {
                return true
            }
            return false
        }

        classToExtend.prototype.isClassy = function () {
            if (this.battery.expectedLife >= 3 && (this.color === "Silver" || this.color === "Black") && this.weight < 3) {
                return true
            }
            return false
        }

    }
    return {
        computerQualityMixin,
        styleMixin
    }
}
