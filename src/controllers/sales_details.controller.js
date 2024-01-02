import SalesDetail from '../models/sales_detail.model.js'

const getAll = async (req, res) => {
  try {
    const result = await SalesDetail.getAll()
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

const getById = async (req, res) => {
  try {
    const result = await SalesDetail.getById(req.params.id)
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

const insert = async (req, res) => {
  try {
    const saleDetail = req.body.detalle_venta
    const result = await SalesDetail.create(saleDetail)
    res.status(201).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

const update = async (req, res) => {
  try {
    const saleDetail = req.body.detalle_venta
    const result = await SalesDetail.update(saleDetail)
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

const remove = async (req, res) => {
  try {
    const result = await SalesDetail.delete(req.params.id)
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error: error.message })
  }
}

export default {
  getAll,
  getById,
  insert,
  update,
  remove
}
