const Payment = require('./model')
const Bank = require('../bank/model')

module.exports={
    index: async(req, res)=>{
        try {
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            const payment = await Payment.find()
            .populate('banks')
            res.render('admin/payment/view_payment', {
                payment,
                alert,
                name: req.session.user.name,
                title: 'Page Payment'
            })
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },
    viewCreate : async(req, res) => {
        try {
            const bank = await Bank.find()
            res.render('admin/payment/create', {
                bank,
                name: req.session.user.name,
                title: 'Page Insert Payment'
            })
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },
    actionCreate : async(req, res) => {
        try {
            const {type, banks} = req.body

            let payment = await Payment({type, banks})
            await payment.save()

            req.flash('alertMessage', 'Successfully Added Payment');
            req.flash('alertStatus', 'success');

            res.redirect('/payment')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },
    viewEdit : async(req, res) => {
        try {
            const {id} = req.params
            const payment = await Payment.findById({_id : id})
            .populate('banks')
            const bank = await Bank.find()
            res.render('admin/payment/edit', {
                payment,
                bank,
                name: req.session.user.name,
                title: 'Page Edit Payment'
            })
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },
    actionEdit : async (req, res) => {
        try {
            const {id} = req.params
            const {type} = req.body
            const {banks} = req.body
            await Payment.findByIdAndUpdate({
                _id : id
            }, {type, banks})

            req.flash('alertMessage', 'Successfully Edit Payment');
            req.flash('alertStatus', 'warning');

            res.redirect('/payment')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },
    actionDelete : async(req, res) => {
        try {
            const {id} = req.params
            await Payment.findByIdAndRemove({
                _id : id
            })

            req.flash('alertMessage', 'Successfully Delete Payment');
            req.flash('alertStatus', 'danger');

            res.redirect('/payment')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },
    actionStatus : async(req, res) => {
        try {
            const {id} = req.params
            const payment = await Payment.findById({_id : id})
            let status = payment.status === 'Y' ? 'N' : 'Y'
            
            payment = await Payment.findByIdAndUpdate({
                _id : id
            }, {status})

            req.flash('alertMessage', 'Successfully Update Status Payment');
            req.flash('alertStatus', 'danger');

            res.redirect('/payment')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    }
}