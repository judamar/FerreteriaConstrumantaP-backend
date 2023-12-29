import SalesStatus from '../models/sales_status.model.js'

const getAll = async (req, res) => {
  try {
    const result = await SalesStatus.getAll()
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error })
  }
}

const getById = async (req, res) => {
  try {
    const result = await SalesStatus.getById(req.params.id)
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error })
  }
}

const create = async (req, res) => {
  const status = req.body.salesStatus.estado
  try {
    const result = await SalesStatus.createSalesStatus(status)
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error })
  }
}

const update = async (req, res) => {
  const status = req.body.salesStatus.estado
  try {
    const result = await SalesStatus.updateSalesStatus(req.params.id, status)
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error })
  }
}

const remove = async (req, res) => {
  try {
    const result = await SalesStatus.deleteSalesStatus(req.params.id)
    res.status(200).json({ status: 'OK', result })
  } catch (error) {
    res.status(500).json({ status: 'ERROR', error })
  }
}

export default {
  getAll,
  getById,
  create,
  update,
  remove
}
