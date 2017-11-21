import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import request from 'superagent'
import * as constants from '../constants'

class Photos extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            photos: []
        }

        this.getPhotos = this.getPhotos.bind(this)
        this.handlePhotoUpload = this.handlePhotoUpload.bind(this)
    }

    componentDidMount() {
        request
            .get(constants.GAL_BACKEND_MEDIA_URL + '?public_photo&uploaded_photo')
            .auth(this.props.userInfo.id, this.props.userInfo.accessToken)
            .end(this.getPhotos)
    }

    getPhotos(err, resp) {
        if (err) {
            console.log(err)
        } else {
            let photos = resp.body.uploaded_photo
            for (var photo in photos) {
              photos.push({
                name: photo.name,
                download_url: photo.download_url
              })
            }
            this.setState({photos: photos})
        }
    }

    handlePhotoUpload(file) {
        request
            .post(constants.GAL_BACKEND_MEDIA_URL + '?photo')
            .type('form')
            .auth(this.props.userInfo.id, this.props.userInfo.accessToken)
            .send({name: file.name})
            .end((err, resp) => {
                if (err) {
                  console.log(err)
                  return
                }

                console.log(resp.body)
                var upload_info = resp.body.upload_info
                upload_info.fields['file'] = file
                var signed_url = upload_info.url + '?'
                for (var key in upload_info.fields) {
                  signed_url += '&' + key + '=' + upload_info.fields[key]
                }
                console.log(upload_info.fields)
                return request
                  .post(upload_info.url)
                  .field(upload_info.fields)
                  // .attach(file.name, file)
                  .end((e, r) => {
                    console.log(r.req)
                    if (e) {
                      console.log(e)
                      return
                    }
                    // console.log(r)
                    // let photos = this.state.photos
                    // photos.push({
                    //   name: file.name,
                    //   download_url: signed_url
                    // })
                    // this.setState({photos: photos})
                    window.location.reload()
                  })
            })
    }

    render() {
        const photoRows = this.state.photos.map((photo, idx) => (
            <div className="photo-container">
                <img src={photo.download_url} title={photo.name} alt={photo.name} />
            </div>
        ))

        return (
            <div className="content--center">
              {photoRows}
              <br /><br />

              <RaisedButton containerElement="label" label="Upload">
                <input type="file" onChange={e => {this.handlePhotoUpload(e.target.files[0]); this.value=''}} style={{display: 'none'}} />
              </RaisedButton>
            </div>
        )
    }

}

export default Photos
