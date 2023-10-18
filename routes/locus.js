const express = require('express');
const router = express.Router();
const Locus = require('../models/Locus');

router.get('/', async (req, res) => {
  const { id, assemblyId, regionId, membershipStatus, sideloading, page, limit, sort } = req.query;

  // Build the filter object based on query parameters
  const filter = {};
  if (id) filter.id = id;
  if (assemblyId) filter.assemblyId = assemblyId;
  if (regionId) filter.regionId = regionId;
  if (membershipStatus) filter.membershipStatus = membershipStatus;

  // Build the sorting options
  const sortOptions = [];
  if (sort) {
    const [field, order] = sort.split(':');
    sortOptions.push([field, order === 'desc' ? 'DESC' : 'ASC']);
  }

  // Set the default pagination values
  const pageNumber = parseInt(page) || 1;
  const pageSize = parseInt(limit) || 1000;

  try {
    // Perform the query to retrieve the loci
    const loci = await Locus.findAll({
      where: filter,
      limit: pageSize,
      offset: (pageNumber - 1) * pageSize,
      order: sortOptions,
    });

    // Check if sideloading is requested
    if (sideloading === 'locusMembers') {
      // Perform additional queries to retrieve locus members
      // and attach them to the loci object
      for (const locus of loci) {
        const locusMembers = await LocusMember.findAll({ where: { locusId: locus.id } });
        locus.dataValues.locusMembers = locusMembers;
      }
    }

    res.json(loci);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
