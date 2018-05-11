package com.nineonecp;

import android.app.Application;

import com.facebook.react.ReactApplication;
<<<<<<< HEAD
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.jadsonlourenco.RNShakeEvent.RNShakeEventPackage;
import com.beefe.picker.PickerViewPackage;
import com.imagepicker.ImagePickerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.microsoft.codepush.react.CodePush;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
=======
import com.learnium.RNDeviceInfo.RNDeviceInfo;
>>>>>>> 3f4fcfd9c3dd8fecdfe9bb4ec75370d791025c37
import com.ocetnik.timer.BackgroundTimerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }
    
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
<<<<<<< HEAD
            new ReactVideoPackage(),
            new VectorIconsPackage(),
            new RNSoundPackage(),
            new RNShakeEventPackage(),
            new PickerViewPackage(),
            new ImagePickerPackage(),
            new RNFetchBlobPackage(),
            new CodePush(null, getApplicationContext(), BuildConfig.DEBUG),
            new RCTCameraPackage(),
            new ReactNativeAudioPackage(),
=======
            new RNDeviceInfo(),
>>>>>>> 3f4fcfd9c3dd8fecdfe9bb4ec75370d791025c37
            new BackgroundTimerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
