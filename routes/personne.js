import express from 'express';
import connection from '../services/db.js';

const router = express.Router();

router.get('/', function(req, res, next) {
    connection.query('SELECT * FROM evenement', function(err, result) {
        if (err) {
            return next(err);
        }
        res.status(200).json(result);
    })
});

router.get('/:id', function(req, res, next) {
    connection.query('SELECT * FROM evenement WHERE id = ?', [req.params.id], function(err, result) {
        if (err) {
            return next(err);
        }
        res.status(200).json(result);
    })
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    connection.query('INSERT INTO evenement SET ?', req.body, function(err, result) {
        if (err) {
            return next(err);
        }
        res.status(201).json(result);
    })
});

router.put('/:id', function(req, res, next) {
    connection.query('UPDATE evenement SET ? WHERE id = ?', [req.body, req.params.id], function(err, result) {
        if (err) {
            return next(err);
        }
        res.status(200).json(result);
    })
});

router.delete('/:id', function(req, res, next) {
    connection.query('DELETE FROM evenement WHERE id = ?', [req.params.id], function(err, result) {
        if (err) {
            return next(err);
        }
        res.status(200).json(result);
    })
});
router.put('/:id/increment', function(req, res, next) {
    connection.query('UPDATE evenement SET nbPlace = nbPlace + 1 WHERE idE = ?', [req.params.id], function(err, result) {
        if (err) {
            console.log(err); // Log the error for debugging purposes
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });
});
router.get('/date/:selectedDate', function(req, res, next) {
    const selectedDate = req.params.selectedDate;
    const query = 'SELECT * FROM evenement WHERE DATE(date) = ?';
  
    connection.query(query, [selectedDate], function(err, result) {
      if (err) {
        console.log(err); // Log the error for debugging purposes
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  });
  



export default router;