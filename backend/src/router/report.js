const express = require('express');
const reportRouter = express.Router();

const { Report } = require('../models/Reports');
const { userAuth } = require('../middleware/authmiddle');
const { upload, cloudinary } = require('../cloudinary/cloudinary');
const { analyzeFileBase64 } = require('../gemini-api/gemini');


// ✅ Upload Medical Report
reportRouter.post('/upload', userAuth, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Medical report file is required'
            });
        }

        const fileUrl = req.file.path;
        const publicId = req.file.filename;
        const mimeType = req.file.mimetype;

        // Download file from Cloudinary
        const fileResponse = await fetch(fileUrl);

        if (!fileResponse.ok) {
            return res.status(400).json({
                success: false,
                message: 'Unable to read uploaded file'
            });
        }

        const arrayBuffer = await fileResponse.arrayBuffer();

        const base64File = Buffer.from(arrayBuffer).toString("base64");

        // 🤖 Analyze with Gemini
        const ai = await analyzeFileBase64(
            base64File,
            mimeType
        );

        // ❌ AI analysis failed
        if (!ai?.ok) {
            // Remove uploaded file
            try {
                await cloudinary.uploader.destroy(publicId);
            } catch (deleteErr) {
                console.warn(
                    "Cloudinary delete error:",
                    deleteErr.message
                );
            }

            return res.status(500).json({
                success: false,
                message: 'Unable to analyze the medical report'
            });
        }

        // ❌ Not a medical report
        if (!ai.isMedicalReport) {
            // Delete non-medical file from Cloudinary
            try {
                await cloudinary.uploader.destroy(publicId);
            } catch (deleteErr) {
                console.warn(
                    "Cloudinary delete error:",
                    deleteErr.message
                );
            }

            return res.status(400).json({
                success: false,
                message: 'Only medical reports are allowed',
                is_medical_report: false
            });
        }

        // ✅ Save only medical reports
        const report = await Report.create({
            user: req.user._id,
            filename: req.file.originalname,
            fileUrl,
            public_id: publicId,

            title: ai.parsed.title || 'Medical Report',

            summary: ai.parsed.summary || '',

            explanation_en: ai.parsed.explanation_en || '',

            explanation_ro: ai.parsed.explanation_ro || '',

            suggested_questions: ai.parsed.suggested_questions || []
        });

        return res.status(200).json({
            success: true,
            message: 'Medical report uploaded successfully ✅',
            report
        });

    } catch (err) {
        console.error("❌ Upload Error:", err);

        return res.status(500).json({
            success: false,
            message: 'Server error while uploading report',
            error: err.message
        });
    }
}
);


// ✅ Fetch My Reports
reportRouter.get('/myreports', userAuth, async (req, res) => {
    try {
        const reports = await Report.find({ user: req.user._id }).sort({ createdAt: -1 });

        return res.json({
            success: true,
            reports
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch reports',
            error: error.message
        });
    }
}
);


// ✅ Delete Report + Cloudinary
reportRouter.delete('/:id', userAuth, async (req, res) => {
    try {
        const report = await Report.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        if (report.public_id) {
            await cloudinary.uploader.destroy(
                report.public_id
            );
        }

        await Report.findByIdAndDelete(
            report._id
        );

        return res.status(200).json({
            success: true,
            message:
                'Report deleted successfully from DB & Cloudinary ✅'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message:
                'Error while deleting report',
            error: error.message
        });
    }
}
);


// ✅ Insights
reportRouter.get('/insights', userAuth, async (req, res) => {
    try {
        const reports = await Report
            .find({ user: req.user._id })
            .sort({ createdAt: -1 });

        const insights = reports.map((r) => ({
            _id: r._id,

            reportTitle:
                r.title || r.filename,

            summary:
                r.summary ||
                "No summary available",

            explanation_en:
                r.explanation_en ||
                "No explanation available",

            explanation_ro:
                r.explanation_ro ||
                "No explanation available"
        }));

        return res.status(200).json({
            success: true,
            message:
                'Insights fetched successfully ✅',
            insights
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message:
                'Server error while fetching insights',
            error: error.message
        });
    }
}
);


// ✅ Single Report
reportRouter.get('/:id', userAuth, async (req, res) => {
    try {
        const report = await Report.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        return res.json({
            success: true,
            report
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}
);

module.exports = {
    reportRouter
};
