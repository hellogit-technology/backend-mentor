// /**
//    * @constant defaultDir: Get assets relative path
//    */

// private static readonly defaultDir = {
//     css: path.join(__dirname, '../../../../public/css'),
//     js: path.join(__dirname, '../../../../public/js')
//   };

//   /**
//    *  @constant injectionAssets: Get file name
//    */

//   private static readonly injectionAssets = {
//     cssFile: injectFile(RenderControllers.defaultDir.css, 'global'),
//     cssValidation: injectFile(RenderControllers.defaultDir.css, 'validation'),
//     cssToast: injectFile(RenderControllers.defaultDir.css, 'toast'),
//     jsFile: injectFile(RenderControllers.defaultDir.js, 'global'),
//     jsValidation: injectFile(RenderControllers.defaultDir.js, 'validation'),
//     jsHelpers: injectFile(RenderControllers.defaultDir.js, 'helpers'),
//     jsToast: injectFile(RenderControllers.defaultDir.js, 'toast')
//   };

//   /**
//    * @constant limitItems: Limit items in pagination
//    */

//   private static readonly limitItems = {
//     clubs: 20,
//     events: 20,
//     students: 20,
//     adminAccount: 20,
//     leaderAccount: 20
//   };


//   Event.find()
//   .populate('club')
//   .populate('campus')
//   .populate('editor')
//   .limit(RenderControllers.limitItems.events)
//   .skip(page * RenderControllers.limitItems.events - RenderControllers.limitItems.events)



//   if (search) {
//     infoPage['search'] = {
//       searchBox: 'active show',
//       queryData: search as string
//     };
//     const regex = new RegExp(`.*${search as string}.*`, 'i');
//     searchCondition = { $or: [{ fullname: regex }, { email: regex }, { schoolId: regex }] };
//   } else {
//     searchCondition = {};
//   }
//   let searchCondition: QueryOptions;
//   const { search } = req.query;
//   const page = parseInt(req.query.page as string) || 1;
//   const limitItem = RenderControllers.limitItems['students'];

//   Student.find(searchCondition)
//   .populate('campus')
//   .populate('editor')
//   .limit(RenderControllers.limitItems.students)
//   .skip(page * RenderControllers.limitItems.students - RenderControllers.limitItems.students)

//   const queryData = {
       
//     students: studentsResult,
//     totalItem: studentsResult.length,
//     itemsOnePage: limitItem,
//     pagination: {
//       current: page,
//       pages: Math.ceil(studentsResult.length / limitItem)
//     }
//   };



//   let searchCondition: QueryOptions;
//   const { search } = req.query;
//       const page = parseInt(req.query.page as string) || 1;
//       const limitItem = RenderControllers.limitItems['adminAccount'];
//       const files = RenderControllers.injectionAssets;

      

//       Club.find({}),
//       AdminAccount.find(searchCondition)
//         .populate('campus')
//         .populate('editor')
//         .limit(RenderControllers.limitItems.adminAccount)
//         .skip(page * RenderControllers.limitItems.adminAccount - RenderControllers.limitItems.adminAccount)

//         const queryData = {
        
//             clubs: clubsResult,
//             adminAccount: adminResult,
//             totalItem: adminResult.length,
//             itemsOnePage: limitItem,
//             pagination: {
//               current: page,
//               pages: Math.ceil(adminResult.length / limitItem)
//             }
//           };


//           let searchCondition: QueryOptions;

//           const { search } = req.query;


//       const page = parseInt(req.query.page as string) || 1;
//       const limitItem = RenderControllers.limitItems['leaderAccount'];
//       const files = RenderControllers.injectionAssets;

//       LeaderAccount.find(searchCondition)
//           .populate('campus')
//           .populate('club')
//           .populate('editor')
//           .limit(RenderControllers.limitItems.leaderAccount)
//           .skip(page * RenderControllers.limitItems.leaderAccount - RenderControllers.limitItems.leaderAccount)

//           if (search) {
//             infoPage['search'] = {
//               searchBox: 'active show',
//               queryData: search as string
//             };
//             const regex = new RegExp(`.*${search as string}.*`, 'i');
//             searchCondition = { $or: [{ fullname: regex }, { email: regex }, { schoolId: regex }] };
//           } else {
//             searchCondition = {};
//           }

//           const 
//           leaderAccount: leaderResult,
//           totalItem: leaderResult.length,
//           itemsOnePage: limitItem,
//           pagination: {
//             current: page,
//             pages: Math.ceil(leaderResult.length / limitItem)
//           }
//         };