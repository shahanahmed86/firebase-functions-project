const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.addSurvey = functions.https.onCall(async (data, context) => {
	return await admin.firestore().collection('surveys').add({ ...data });
});

// firestore trigger for tracking activity
exports.onTransaction = functions.firestore
	.document('/{collection}/{id}')
	.onCreate((snap, context) => {
		const surveys = admin.firestore().collection('surveys');
		const id = context.params.id;

		console.log(snap.data(), id);

		if (context.params.collection === 'surveys') {
			return surveys.doc(id).update({ textVal: 'hello triggered this entry' });
		}

		return null;
	});
