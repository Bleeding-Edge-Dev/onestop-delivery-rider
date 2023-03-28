package com.onestopdelivery.rider;
import com.equimaps.capacitor_background_geolocation.BackgroundGeolocation;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;
import com.getcapacitor.community.nativemarket.NativeMarket;
public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      add(BackgroundGeolocation.class);
      add(NativeMarket.class);
    }});
  }
}
