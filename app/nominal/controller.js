const Nominal = require('./model')

module.exports={
    index: async(req, res)=>{
        try {
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            const nominal = await Nominal.find()
            res.render('admin/nominal/view_nominal', {
                nominal,
                alert,
                name: req.session.user.name,
                title: 'Page Nominal'
            })
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },
    viewCreate : async(req, res) => {
        try {
            res.render('admin/nominal/create', {
                name: req.session.user.name,
                title: 'Page Insert Nominal'
            })
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },
    actionCreate : async(req, res) => {
        try {
            const {coinName, coinQuantity, price} = req.body

            let nominal = await Nominal({coinName, coinQuantity, price})
            await nominal.save()

            req.flash('alertMessage', 'Successfully Added Nominal');
            req.flash('alertStatus', 'success');

            res.redirect('/nominal')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },
    viewEdit : async(req, res) => {
        try {
            const {id} = req.params
            const nominal = await Nominal.findById({_id : id})
            res.render('admin/nominal/edit', {
                nominal,
                name: req.session.user.name,
                title: 'Page Edit Nominal'
            })
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },
    actionEdit : async (req, res) => {
        try {
            const {id} = req.params
            const {coinName} = req.body
            const {coinQuantity} = req.body
            const {price} = req.body
            await Nominal.findByIdAndUpdate({
                _id : id
            }, {coinName, coinQuantity, price})

            req.flash('alertMessage', 'Successfully Edit Nominal');
            req.flash('alertStatus', 'warning');

            res.redirect('/nominal')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },
    actionDelete : async(req, res) => {
        try {
            const {id} = req.params
            await Nominal.findByIdAndRemove({
                _id : id
            })

            req.flash('alertMessage', 'Successfully Delete Nominal');
            req.flash('alertStatus', 'danger');

            res.redirect('/nominal')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    }
}