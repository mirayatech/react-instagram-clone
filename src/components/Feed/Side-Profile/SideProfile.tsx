import '/src/styles/SideProfile.css'
export function SideProfile() {
  return (
    <div className="SideProfile">
      <div className="main__profile">
        <img
          src="https://i.pinimg.com/564x/56/c5/8a/56c58aecc8659b978d8339bf8450cb9c.jpg"
          alt="Your profile picture"
        />

        <div className="main__profile--info">
          <p className="username">mirayatech</p>
          <p className="light-text">Welcome to instagram</p>
        </div>
        <button>Sign Out</button>
      </div>

      <div className="suggestions">
        <div className="suggestions__intro">
          <p>Suggestions for you</p> <p>See All</p>
        </div>

        <div className="profile">
          <img
            src="https://avatarfiles.alphacoders.com/235/thumb-235828.png"
            alt="Mitsuki profile picture"
          />
          <div className="profile--info">
            <p className="username">mitsuki__official</p>
            <p>Followed by uzumaki_boruto</p>
          </div>
          <button>Follow</button>
        </div>

        <div className="profile">
          <img
            src="https://bestprofilepictures.com/wp-content/uploads/2021/06/Zenitsu-Profile-Pic.jpg"
            alt="Mitsuki profile picture"
          />
          <div className="profile--info">
            <p className="username">zenitsu</p>
            <p>Followed by tanjiro + 1 more</p>
          </div>
          <button>Follow</button>
        </div>

        <div className="profile">
          <img
            src="https://i.pinimg.com/736x/59/b3/56/59b3569f24106c678148d1ecaec16f08.jpg"
            alt="Mitsuki profile picture"
          />
          <div className="profile--info">
            <p className="username">levi_ackerman</p>
            <p>Follows you</p>
          </div>
          <button>Follow</button>
        </div>

        <div className="profile">
          <img
            src="https://i.pinimg.com/originals/4d/6c/a5/4d6ca51b0ff1524f1f791ef3f646a921.jpg"
            alt="Mitsuki profile picture"
          />
          <div className="profile--info">
            <p className="username">suzune_horikita</p>
            <p>New to Instagram</p>
          </div>
          <button>Follow</button>
        </div>

        <div className="profile">
          <img
            src="https://avatarfiles.alphacoders.com/178/178573.jpg"
            alt="Mitsuki profile picture"
          />
          <div className="profile--info">
            <p className="username">sasuke_uchiha</p>
            <p>Followed by tanjiro + 5 more</p>
          </div>
          <button>Follow</button>
        </div>
      </div>
    </div>
  )
}
