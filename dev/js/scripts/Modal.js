import iziModal from 'izimodal-1.6.0/'
// Initialise imported function as jQuery function
$.fn.iziModal = iziModal;

export default class Modal {
    constructor(selectorModal, selectorModalOpen, selectorModalClose, options) {
        this.modal = $(selectorModal);
        this.selectorModal = selectorModal;
        this.modalOpen = $(selectorModalOpen);
        this.selectorModalClose = selectorModalClose;
        this.options = options;

        this.init();
    }

    init() {
        this.modal.iziModal(this.options);
        this.modalType = this.open();
        this.close();
    }

    open() {
        let _this = this;
        this.modalOpen.on('click', function(e) {
            e.preventDefault();
            _this.modal = $(`${_this.selectorModal}-${$(this).data('modal-type')}`);
            _this.modal.iziModal('open');
        });
    }

    close() {
        this.modal.find(this.selectorModalClose).on('click', (e) => {
            e.preventDefault();
            this.modal.iziModal('close');
        });
    }
}