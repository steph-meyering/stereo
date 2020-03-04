Our components are organized as follows:

* Root
    * App
        * NavBar
        * (main component goes here)
        * Footer (song progress bar)

The following routes, defined in App, will render components between NavBar and Footer.

* `/`
    * Splash
* `/login`
    * SessionForm
* `/signup`
    * SessionForm
* `/stream`
    * SongIndex
        * SongsIndexItem
* `/:userId`
    * ProfileComponent
    * SongIndex
        * SongsIndexItem
    * UserSidebar
        * CommentsComponent
        * UserInfoComponent
* `/upload`
    * SongUploadForm
* `/:userId/:songId`
    * SongShow
* `/:userId/:songId/edit`
    * SongUploadForm
