/* eslint-disable prettier/prettier */
<View style={{flex: 1, backgroundColor: '#000'}}>
  {storys.media && storys.media.map(item => item.url).join() !== '' ? (
    <>
      {storys.media[current].type === 'image' ? (
        <Image
          source={{uri: storys.media[current].url.join()}}
          onLoadEnd={() => {
            progress.setValue(0);
            start();
          }}
          style={{width: width, height: height}}
        />
      ) : (
        <TouchableOpacity onPress={handleVideoPress} style={{opacity: 1}}>
          <VideoPlayer
            video={{uri: storys.media[current].url.join()}}
            videoWidth={1600}
            videoHeight={900}
            thumbnail={{uri: storys.media[current].url.join()}}
            autoplay={true}
            hideControls={true}
            showOnStart={true}
            paused={isPaused}
            style={styles.video_story}
          />
        </TouchableOpacity>
      )}
    </>
  ) : (
    <View style={styles.container_content}>
      <Text style={styles.content}>
        {storys.content ? storys.content : storys[current].content}
      </Text>
      {/* {story.content ? (
            <Text style={styles.content}>
              {story.content ? story.content : story[current].content}
            </Text>
          ) : (
            <>
              {story
                .flatMap(item => item.media.map(item => item.type))
                .join() === 'image' ? (
                <Image
                  source={{
                    uri: story
                      .flatMap(item => item.media.map(item => item.url))
                      .join(),
                  }}
                  onLoadEnd={() => {
                    progress.setValue(0);
                    start();
                  }}
                  style={{width: width, height: height}}
                />
              ) : (
                <TouchableOpacity
                  onPress={handleVideoPress}
                  style={{opacity: 1}}>
                  <VideoPlayer
                    video={{
                      uri: story
                        .flatMap(item => item.media.map(item => item.url))
                        .join(),
                    }}
                    videoWidth={1600}
                    videoHeight={900}
                    thumbnail={{
                      uri: story
                        .flatMap(item => item.media.map(item => item.url))
                        .join(),
                    }}
                    autoplay={true}
                    hideControls={true}
                    showOnStart={true}
                    paused={isPaused}
                    style={styles.video_story_me}
                  />
                </TouchableOpacity>
              )}
            </>
          )} */}
    </View>
  )}

  <View
    style={{
      width: width,
      position: 'absolute',
      top: 10,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row',
    }}>
    {storys.media &&
      Array.isArray(storys.media) &&
      storys.media.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              flex: 1,
              height: 3,
              backgroundColor: 'rgba(255,255,255,0.5)',
              marginLeft: 5,
            }}>
            <Animated.View
              style={{
                flex: current === index ? 1 : progress,
                height: 3,
                backgroundColor: 'rgba(255,255,255,1)',
              }}
            />
          </View>
        );
      })}
  </View>
  <View
    style={{
      width: width,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      top: 30,
    }}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {storys.idUsers ? (
        <>
          <Image
            source={{uri: storys.idUsers.avatar}}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              marginLeft: 10,
            }}
          />
          <View
            style={{
              position: 'absolute',
            }}>
            <Text
              style={{
                color: '#fff',
                left: 60,
                fontWeight: 'bold',
              }}>
              {storys.idUsers.name}
            </Text>
            <Text style={{color: '#fff', left: 60}}>
              {formatTime(storys.createAt)}
            </Text>
          </View>
        </>
      ) : (
        <>
          <Image
            source={{uri: storys[current].idUsers.avatar}}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              marginLeft: 10,
            }}
          />
          <View
            style={{
              position: 'absolute',
            }}>
            <Text
              style={{
                color: '#fff',
                left: 60,
                fontWeight: 'bold',
              }}>
              {storys[current].idUsers.name}
            </Text>
            <Text style={{color: '#fff', left: 60}}>
              {formatTime(storys[current].createAt)}
            </Text>
          </View>
        </>
      )}
    </View>
    <TouchableOpacity onPress={showBottomSheet}>
      <Image
        source={require('../../../../../assets/icon_more_story.png')}
        style={{
          width: 20,
          height: 20,
          left: 100,
          top: 13,
          position: 'absolute',
        }}
      />
    </TouchableOpacity>

    {storys.idUsers ? (
      <View
        style={{
          width: width,
          height: height,
          position: 'absolute',
          top: 0,
        }}>
        {bottomSheetVisible && (
          <TouchableWithoutFeedback
            onPress={() => {
              setBottomSheetVisible(false);
              reportSuccess();
            }}>
            <View
              style={{
                width: width,
                height: height,
                position: 'absolute',
                top: 0,
              }}>
              <View
                style={{
                  width: width,
                  height: 100,
                  backgroundColor: '#fff',
                  position: 'absolute',
                  bottom: 15,
                  flexDirection: 'row',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 20,
                    marginLeft: 20,
                    marginTop: 20,
                  }}>
                  Báo cáo
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    ) : (
      <View
        style={{
          width: width,
          height: height,
          position: 'absolute',
          top: 0,
        }}>
        {bottomSheetVisible && (
          <TouchableOpacity onPress={showDialog}>
            <View
              style={{
                width: width,
                height: height,
                position: 'absolute',
                top: 0,
              }}>
              <View
                style={{
                  width: width,
                  height: 100,
                  backgroundColor: '#fff',
                  position: 'absolute',
                  bottom: 15,
                  flexDirection: 'row',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 20,
                    marginLeft: 20,
                    marginTop: 20,
                  }}>
                  Xóa story
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    )}
    <TouchableOpacity style={{marginRight: 20, marginTop: 10}} onPress={close}>
      <Image
        source={require('../../../../../assets/icon_delete_white.png')}
        style={{
          width: 24,
          height: 24,
          marginRight: 10,
        }}
      />
    </TouchableOpacity>
  </View>
  <View
    style={{
      width: width,
      height: height,
      position: 'absolute',
      top: 100,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
    <TouchableOpacity style={{width: '30%', height: '100%'}} onPress={previous}>
      <View />
    </TouchableOpacity>
    <TouchableOpacity style={{width: '30%', height: '100%'}} onPress={next}>
      <View />
    </TouchableOpacity>
  </View>
  {/* rep story */}
  <View
    style={{
      height: 50,
      backgroundColor: '#fff',
      position: 'absolute',
      bottom: 60,
      borderWidth: 1,
      borderColor: '#666',
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 33,
      borderRadius: 20,
    }}>
    <Image
      source={require('../../../../../assets/icon_comment.png')}
      style={{
        width: 25,
        height: 25,
        borderRadius: 20,
        marginLeft: 10,
      }}
    />
    <TextInput
      placeholder="Gửi tin nhắn..."
      style={{
        width: '80%',
        height: 48,
        backgroundColor: '#fff',
        paddingLeft: 10,
      }}
    />
  </View>
  <DialogDeletePosts.Container visible={visibleDiaLogDeletePosts}>
    <DialogDeletePosts.Title>Xóa story này ?</DialogDeletePosts.Title>
    <DialogDeletePosts.Description>
      Sau khi xóa bài story này bạn không thể khôi phục.
    </DialogDeletePosts.Description>
    <DialogDeletePosts.Button label="Hủy" onPress={handleCancel} />
    <DialogDeletePosts.Button label="Chấp nhận" onPress={handleDelete} />
  </DialogDeletePosts.Container>
</View>;
